import EasySpeech from 'easy-speech';

let state: 'idle' | 'talking' = 'idle';

function isTTSSupported() {
	const supportInfo = EasySpeech.detect();
	const isChrome = /Chrome/.test(navigator.userAgent);
	const isMobile = /Mobi|Android/i.test(navigator.userAgent);

	return (
		!(isMobile && isChrome) && supportInfo.speechSynthesis && supportInfo.speechSynthesisUtterance
	);
}

export function getVoices(lang: SpeechSynthesisVoice['lang']): SpeechSynthesisVoice[] {
	const voices = EasySpeech.voices();
	return voices.filter((v) => v.lang === lang);
}

export async function initTTS(): Promise<boolean> {
	try {
		if (!isTTSSupported()) return false;
		await EasySpeech.init({
			maxTimeout: 5000,
			interval: 250
		});
		return true;
	} catch {
		return false;
	}
}

export function stopTTS() {
	if (state !== 'talking') return;
	EasySpeech.cancel();
	state = 'idle';
}

export async function TTS(text: string, voiceOptions = {}) {
	try {
		if (state === 'talking') {
			stopTTS();
			return;
		}
		state = 'talking';
		await EasySpeech.speak({
			text,
			...voiceOptions
		});
	} catch {
		return;
	}
}
