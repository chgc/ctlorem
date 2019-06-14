import { WORDS_CHT } from './words';

const words = WORDS_CHT.split(' ');
const CHARS_MIN_IN_SENTENCE = 10,
  CHARS_MAX_IN_SENTENCE = 30,
  SENTENCE_MIN_IN_PARAGRAPH = 3,
  SENTENCE_MAX_IN_PARAGRAPH = 10;

const symbol = {
  period: '\u3002',
  comma: '\uff0c'
};

export function generateLorem(wordCount: number) {
  return gen_paragraph(wordCount, wordCount);
}

function gen_paragraph(
  min_char: number,
  max_char: number,
  min_sentence?: number,
  max_sentence?: number
) {
  const least_sentence = min_sentence || SENTENCE_MIN_IN_PARAGRAPH;
  const most_sentence = max_sentence || SENTENCE_MAX_IN_PARAGRAPH;

  let paragrph = '';

  if (min_sentence || max_sentence || !(min_char && max_char)) {
    const randomRange = range(choice(range(least_sentence, most_sentence)));
    for (let i = 0; i < randomRange.length; i++) {
      let sentence = gen_sentence();
      if (max_char && sentence.length + paragrph.length > max_char) {
        break;
      }
      paragrph += sentence;
      paragrph += symbol.comma;
    }
  } else if (!!max_char) {
    while (true) {
      let sentence = gen_sentence();
      if (max_char && sentence.length + paragrph.length > max_char) {
        break;
      }
      paragrph += sentence;
      paragrph += symbol.comma;
    }
  }

  if (!!min_char) {
    let senetence_with_seperator = true;
    while (paragrph.length < min_char) {
      let sentence_max_char = max_char - paragrph.length - 1;
      if (sentence_max_char < CHARS_MIN_IN_SENTENCE) {
        sentence_max_char += 1;
        senetence_with_seperator = false;
      }
      let sentence = gen_sentence({ max_char: sentence_max_char });
      paragrph += sentence;
      if (senetence_with_seperator) {
        paragrph += symbol.comma;
      }
    }
  }

  if (paragrph.length > CHARS_MIN_IN_SENTENCE) {
    paragrph = paragrph.slice(0, paragrph.length - 1) + symbol.period;
  }

  return paragrph;
}

function gen_sentence({
  min_char,
  max_char
}: { min_char?: number; max_char?: number } = {}) {
  min_char = min_char || CHARS_MIN_IN_SENTENCE;
  max_char = max_char || CHARS_MAX_IN_SENTENCE;
  let sentence: string = '';

  const char_count = random(min_char, max_char);
  while (sentence.length < char_count) {
    sentence += gen_word();
  }

  if (sentence.length > char_count) {
    sentence.substr(0, char_count);
  }

  return sentence;
}

function gen_word() {
  return choice(words);
}

function random(includedMin: number, includedMax: number) {
  return Math.floor(Math.random() * (includedMax - includedMin)) + includedMin;
}

function range(start: number, stop?: number): number[] {
  if (!stop) {
    stop = start;
    start = 0;
  }
  const result: number[] = [];
  for (let i = start; i < stop; i++) {
    result.push(i + 1);
  }
  return result;
}

function choice(words: any[]) {
  return words[random(0, words.length)];
}
