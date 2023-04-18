<template>
    <div class="relative inline-flex w-full">
        <div class="btn-no-anim w-full justify-between min-w-44 bg-gray text-white rounded-xl">
            <div class="flex-1 items-center text-gray-500" style="min-height: 36px" @click="toggleDropdown">
                <input
                    v-if="!localselected"
                    value=""
                    type="text"
                    :ref="'input'"
                    @input="updateInput($event)"
                    @blur="clearInput($event)"
                    class="bg-gray text-white w-full no-outline"
                    style="border: 0; padding-left: 0"
                    placeholder="Bitte wähle aus..."
                />
                <div v-else class="flex items-center w-full text-white">
                    <img v-if="etype == 'roles' && getRoleIcon(localselected)" :src="getRoleIcon(localselected)" width="24" height="24" class="mr-2" />
                    <img v-if="etype == 'emojis' && getEmojiIcon(localselected)" :src="getEmojiIcon(localselected)" width="24" height="24" class="mr-2" />
                    <input
                        value=""
                        type="text"
                        :ref="'input'"
                        @input="updateInput($event)"
                        @blur="clearInput($event)"
                        class="bg-gray text-white w-full no-outline"
                        style="border: 0; padding-left: 0"
                        :placeholder="getName(localselected)"
                    />
                </div>
            </div>
            <svg
                v-if="localselected && !disable_clear"
                class="shrink-0 ml-1 fill-current text-gray-400"
                width="12"
                height="12"
                viewBox="2 2 12 12"
                @click="clearDropdown"
            >
                <path
                    d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"
                ></path>
            </svg>
            <svg class="shrink-0 ml-2 fill-current text-gray-400" width="11" height="7" viewBox="0 0 11 7" @click="toggleDropdown">
                <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z"></path>
            </svg>
        </div>
        <div class="z-10 absolute ztop-full l-0 w-full bg-gray py-1.5 shadow-lg overflow-y-scroll top-full max-h-42 rounded-xl" v-show="dropdown_open">
            <div class="font-medium text-sm text-gray-600">
                <div v-if="!localbucket.length" class="flex items-center justify-between w-full py-2 px-3 bg-gray-hover cursor-pointer text-gray-500">
                    <span>Keine Ergebnisse</span>
                </div>
                <div
                    v-for="option of localbucket"
                    :key="option"
                    tabIndex="0"
                    class="flex items-center w-full py-2 px-3 bg-gray-hover cursor-pointer text-white"
                    @click="select(option)"
                >
                    <img v-if="etype == 'roles' && getRoleIcon(option.id)" :src="getRoleIcon(option.id)" width="24" height="24" class="mr-2" />
                    <img v-if="etype == 'emojis' && getEmojiIcon(option.id)" :src="getEmojiIcon(option.id)" width="24" height="24" class="mr-2" />
                    <span :style="`color: ${etype == 'roles' ? getRoleColor(option.id) : 'white'}`">{{ option.name ?? option }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'singleselect',
    props: {
        channels: {
            Object,
        },
        roles: {
            Object,
        },
        emojis: {
            Object,
        },
        strings: {
            Object,
        },
        selected: {
            String,
        },
        etype: {
            String,
        },
        ctype: {
            Array,
        },
        color: {
            String,
        },
        disable_clear: {
            Boolean,
        },
        emit: {
            Boolean,
        },
    },
    data() {
        return {
            localselected: this.selected,
            localbucket: this.channels ?? this.roles ?? this.emojis ?? this.strings,
            dropdown_open: false,
        };
    },
    mounted() {
        console.log(this);
    },
    methods: {
        toggleDropdown() {
            if (this.dropdown_open) {
                if (this.$refs['input'] == document.activeElement) return;
                this.dropdown_open = false;
            } else {
                if (this.$refs['input'].value) return this.updateInput();
                this.$refs['input'].focus();
                this.dropdown_open = true;
                if (this.etype == 'roles') this.localbucket = this.roles.filter(i => this.localselected != i.id).sort((a, b) => b.rawPosition - a.rawPosition);
                if (this.etype == 'emojis') this.localbucket = this.emojis.filter(i => this.localselected != i.id);
                if (this.etype == 'strings') this.localbucket = this.strings.filter(i => i != this.localselected);
                if (this.etype == 'channels' && !this.ctype)
                    this.localbucket = this.channels.filter(i => this.localselected != i.id).sort((a, b) => a.rawPosition - b.rawPosition);
                if (this.etype == 'channels' && this.ctype)
                    this.localbucket = this.channels.filter(i => this.ctype.includes(i.type) && this.localselected != i.id).sort((a, b) => a.rawPosition - b.rawPosition);
            }
        },
        clearDropdown(ref) {
            this.localselected = null;
        },
        getName(id) {
            if (!id) return 'Bitte wähle aus...';
            if (this.etype == 'roles') return this.roles.some(i => i.id == id) ? this.roles.find(i => i.id == id).name : `@${id}`;
            if (this.etype == 'emojis') return this.emojis.some(i => i.id == id) ? this.emojis.find(i => i.id == id).name : `${id}`;
            if (this.etype == 'channels') return this.channels.some(i => i.id == id) ? `#${this.channels.find(i => i.id == id).name}` : `#${id}`;
            if (this.etype == 'strings') return this.strings.find(i => i == id);
        },
        getRoleColor(id) {
            return this.roles.find(i => i.id == id)?.color
                ? `#${this.roles
                      .find(i => i.id == id)
                      .color.toString(16)
                      .padStart(6, '0')}`
                : '#fff';
        },
        getRoleIcon(id) {
            const role = this.roles.find(i => i.id == id);
            return role?.icon ? `https://cdn.discordapp.com/role-icons/${role.id}/${role.icon}.png` : null;
        },
        getEmojiIcon(id) {
            if (!id) return null;
            const emoji = this.emojis.find(i => i.id == id);
            return emoji?.url ?? `https://cdn.discordapp.com/emojis/${id}.png`;
        },
        clearInput(e) {
            if (e.relatedTarget && e.relatedTarget.tagName == 'DIV') return;
            this.dropdown_open = false;
        },
        updateInput(e) {
            if (!this.dropdown_open && this.$refs['input'].value) {
                this.dropdown_open = true;
                this.$refs['input'].focus();
            }
            if (this.etype == 'roles') {
                this.localbucket = this.roles.filter(item => item.name.toLowerCase().includes(this.$refs['input'].value.toLowerCase()) && this.localselected != item.id);
                if (!this.localbucket.length && this.$refs['input'].value.length >= 17 && this.$refs['input'].value.length <= 19 && !isNaN(this.$refs['input'].value))
                    this.localbucket.push({
                        id: this.$refs['input'].value,
                        icon: null,
                        name: `User mit ID: ${this.$refs['input'].value}`,
                        color: 16777215,
                    });
            }
            if (this.etype == 'emojis') {
                this.localbucket = this.emojis.filter(
                    item => item.name.toLowerCase().includes(this.$refs['input'].value.toLowerCase()) && !this.localselected.includes(item.id)
                );
                if (!this.localbucket.length && this.$refs['input'].value.length >= 17 && this.$refs['input'].value.length <= 19 && !isNaN(this.$refs['input'].value))
                    this.localbucket.push({
                        id: this.$refs['input'].value,
                        icon: null,
                        name: `Emoji mit der ID: ${this.$refs['input'].value}`,
                    });
            }
            if (this.etype == 'channels')
                this.localbucket = this.channels.filter(
                    item => this.ctype.includes(item.type) && item.name.toLowerCase().includes(this.$refs['input'].value.toLowerCase()) && this.localselected != item.id
                );
            if (this.etype == 'strings')
                this.localbucket = this.strings.filter(item => item.toLowerCase().includes(this.$refs['input'].value.toLowerCase()) && this.localselected != item);
        },
        select(option) {
            this.localselected = option.id ?? option;
            if (this.emit) this.$emit('emit', option.id ?? option);
            this.dropdown_open = false;
            this.$refs['input'].value = '';
        },
        values() {
            return this.localselected;
        },
    },
};
</script>
