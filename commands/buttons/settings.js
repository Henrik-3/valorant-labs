import {uuidv4, getFunction} from '../../methods.js';

export async function execute({interaction, args} = {}) {
    await interaction.deferUpdate();
    const patchGuild = getFunction('patchGuild');
    switch (args[1]) {
        case 'background': {
            switch (args[3]) {
                case 'accept':
                    return patchGuild({interaction: interaction, key: '_background', value: uuidv4(), additionaldata: args[2]});
                case 'deny':
                    return interaction.message.delete();
            }
        }
    }
}
export const name = 'settings';
