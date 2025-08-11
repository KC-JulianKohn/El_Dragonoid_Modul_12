class SoundHub {
    static BOSSATTACK = "./assets/sounds/boss_attack.mp3";
    static BOSSHURT = "./assets/sounds/boss_hurt.mp3";
    static BOSSWALK = "./assets/sounds/boss_walk.mp3";
    static DRAGONBITE = "./assets/sounds/dragon_bite.mp3";
    static DRAGONBREATH = "./assets/sounds/dragon_breath.mp3";
    static DRAGONBREATHINGFIRE = "./assets/sounds/dragon_breathing_fire.mp3";
    static DRAGONDEAD = "./assets/sounds/dragon_dead.mp3";
    static DRAGONFLY = "./assets/sounds/dragon_fly.mp3";
    static DRAGONHURT = "./assets/sounds/dragon_hurt.mp3";
    static DRAGONLANDING = "./assets/sounds/dragon_landing.mp3";
    static DRAGONWALK = "./assets/sounds/dragon_walk.mp3";
    static KNIGHTDEAD = "./assets/sounds/knight_dead.mp3";
    static KNIGHTWALK = "./assets/sounds/knight_walk.mp3";
    static SELETONWALK = "./assets/sounds/seleton_walk.mp3";
    static SKELETONDEAD = "./assets/sounds/skeleton_dead.mp3";
    static EXPLOSION = "./assets/sounds/explosion.mp3";
    static TREASURE = "./assets/sounds/treasure.mp3";
    static FOOD = "./assets/sounds/food.mp3";

    static BACKGROUNDMUSIC = "./assets/sounds/background/background_music.mp3";
    static BOSSFIGHT = "./assets/sounds/background/boss_fight.mp3";

    static GAMEOVER1 = "./assets/sounds/win_lose/game_over_1.mp3";
    static GAMEOVER2 = "./assets/sounds/win_lose/game_over_2.mp3";
    static WIN = "./assets/sounds/win_lose/win.mp3";

    static activeLoops = new Map();
    static loadIntervals = new Map();

    static playSoundOne(src, baseVolume) {
        let sound = new Audio(src);
        sound.baseVolume = baseVolume
        sound.volume = baseVolume * parseFloat(document.getElementById('volume').value);
        sound.preload = 'auto';
        sound.load();
        let check = setInterval(() => {
            if (sound.readyState >= 3) {
                sound.currentTime = 0;
                clearInterval(check);
                SoundHub.loadIntervals.delete(src);
                sound.play();
                SoundHub.activeLoops.set(src, sound);
                sound.addEventListener('ended', () => {
                    SoundHub.activeLoops.delete(src);
                });
            }
        }, 100);
    }

    static playSoundLoop(src, baseVolume) {
        if (SoundHub.activeLoops.has(src) || SoundHub.loadIntervals.has(src)) return;
        let sound = new Audio(src);
        sound.baseVolume = baseVolume
        sound.volume = baseVolume * parseFloat(document.getElementById('volume').value);
        sound.loop = true;
        sound.preload = 'auto';
        sound.load();
        let check = setInterval(() => {
            if (sound.readyState >= 3) {
                sound.currentTime = 0;
                clearInterval(check);
                SoundHub.loadIntervals.delete(src);
                sound.play();
                SoundHub.activeLoops.set(src, sound);
            }
        }, 100);
        SoundHub.loadIntervals.set(src, { check, sound });
    }

    static endOne(src) {
        let sound = SoundHub.activeLoops.get(src);
        if (sound) {
            sound.currentTime = 0;
            sound.pause();
            SoundHub.activeLoops.delete(src);
        }
    }

    static pauseAll() {
        for (let [src, sound] of SoundHub.activeLoops) {
            sound.pause();
        }
    }

    static resumeAll() {
        for (let [src, sound] of SoundHub.activeLoops) {
            sound.play();
        }
    }

    static clearAll() {
        this.pauseAll();
        this.activeLoops.clear();
    }

    static objSetVolume() {
        let volumeValue = parseFloat(document.getElementById('volume').value);
        for (let [, sound] of SoundHub.activeLoops) {
            sound.volume = volumeValue * (sound.baseVolume || 1);
        }

        let volumeImg = document.getElementById('volumeImg');

        if (volumeValue === 0) {
            volumeImg.innerHTML = '🔇';  // Stumm
        } else if (volumeValue > 0 && volumeValue <= 0.35) {
            volumeImg.innerHTML = '🔈';  // Leise
        } else if (volumeValue > 0.35 && volumeValue <= 0.65) {
            volumeImg.innerHTML = '🔉';  // Mittel
        } else if (volumeValue > 0.65) {
            volumeImg.innerHTML = '🔊';  // Laut
        }
    }
}