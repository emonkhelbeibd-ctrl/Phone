import React from 'react';
import {Composition, continueRender, delayRender} from 'remotion';
import '@fontsource/hind-siliguri/bengali-600.css';
import '@fontsource/hind-siliguri/bengali-700.css';
import '@fontsource/hind-siliguri/latin-600.css';
import '@fontsource/hind-siliguri/latin-700.css';
import {Story, TOTAL_FRAMES} from './Story';
import {WIDTH, HEIGHT, FPS} from './config';

const fontHandle = typeof document !== 'undefined' ? delayRender('fonts') : null;
if (typeof document !== 'undefined') {
  Promise.all([
    document.fonts.load("700 56px 'Hind Siliguri'", 'রান্না'),
    document.fonts.load("600 28px 'Hind Siliguri'", 'সিমি'),
  ]).then(() => fontHandle !== null && continueRender(fontHandle));
}

export const Root: React.FC = () => (
  <Composition id="Story" component={Story} durationInFrames={TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
);
