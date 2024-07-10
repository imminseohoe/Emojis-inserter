const EMOJI_RANGES_UNICODE = [
    ['\u{1F300}', '\u{1F320}'], ['\u{1F330}', '\u{1F335}'], ['\u{1F337}', '\u{1F37C}'],
    ['\u{1F380}', '\u{1F393}'], ['\u{1F3A0}', '\u{1F3C4}'], ['\u{1F3C6}', '\u{1F3CA}'],
    ['\u{1F3E0}', '\u{1F3F0}'], ['\u{1F400}', '\u{1F43E}'], ['\u{1F440}'],
    ['\u{1F442}', '\u{1F4F7}'], ['\u{1F4F9}', '\u{1F4FC}'], ['\u{1F500}', '\u{1F53C}'],
    ['\u{1F540}', '\u{1F543}'], ['\u{1F550}', '\u{1F567}'], ['\u{1F5FB}', '\u{1F5FF}']
];
  
const SPECIFIC_EMOJI = ['\u{1F975}', '\u{1F4A9}', '\u{1F984}'];
const SPECIFIC_EMOJI_WEIGHT = 100;  // The higher this number, the more frequent the emoji will appear

function randomEmoji() {
    const count = EMOJI_RANGES_UNICODE.map(r => r.length === 2 ? r[1].codePointAt(0) - r[0].codePointAt(0) + 1 : 1);
    const totalWeight = count.reduce((a, b) => a + b, 0) + SPECIFIC_EMOJI_WEIGHT;
    const weightDistr = count.reduce((acc, val) => {
        if (acc.length > 0) val += acc[acc.length - 1];
        acc.push(val);
        return acc;
    }, []);
    weightDistr.push(weightDistr[weightDistr.length - 1] + SPECIFIC_EMOJI_WEIGHT);

    const point = Math.floor(Math.random() * totalWeight);
    if (point >= weightDistr[weightDistr.length - 2]) {
        return SPECIFIC_EMOJI[Math.floor(Math.random() * SPECIFIC_EMOJI.length)];
    }

    const emojiRangeIdx = weightDistr.findIndex(w => point < w);
    const emojiRange = EMOJI_RANGES_UNICODE[emojiRangeIdx];
    const pointInRange = point - (emojiRangeIdx !== 0 ? weightDistr[emojiRangeIdx - 1] : 0);
    return String.fromCodePoint(emojiRange[0].codePointAt(0) + pointInRange);
}

function sendEmo(text){
    const a = text// Example: hello my name is jaemin

    let newString = "";

    for (const char of a) {
    if (char !== ' ') {
        newString += char;
    } else {
        newString += randomEmoji();
    }
    }
    return newString
// Example: hello😊my😊name😊is😊jaemin
}



var inputDiv = document.getElementById('input');
inputDiv.addEventListener('focus', function() {
    if (this.innerText.trim() === '') {
        this.innerHTML = '';
    }
});
inputDiv.addEventListener('blur', function() {
    if (this.innerText.trim() === '') {
        this.innerHTML = '';
    }
});