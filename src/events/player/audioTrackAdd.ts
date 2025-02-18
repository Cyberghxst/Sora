import { PlayerEventHandler } from '@structures/SoraEventHandler'

export default new PlayerEventHandler({
    name: 'audioTrackAdd',
    once: false,
    execute(queue, track) {}
})