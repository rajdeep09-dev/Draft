const fs = require('fs');
const path = require('path');

// Font file mapping - old hash names to new clean names
const fontMapping = {
  '68b594b1137b14fb2c402fcc_DMSans-Medium.woff2': 'DMSans-Medium.woff2',
  '68b594b11e6754f291966c7b_DMSans-ExtraBold.woff2': 'DMSans-ExtraBold.woff2',
  '68b594b13b017ca9f9a718c9_DMSans-Light.woff2': 'DMSans-Light.woff2',
  '68b594b13c940a53d368d417_DMSans-ExtraLight.woff2': 'DMSans-ExtraLight.woff2',
  '68b594b164bc19fccaee5641_DMSans-Thin.woff2': 'DMSans-Thin.woff2',
  '68b594b1ae76d2d28493db30_DMSans-SemiBold.woff2': 'DMSans-SemiBold.woff2',
  '68b594b1f38b7710f742486c_DMSans-Regular.woff2': 'DMSans-Regular.woff2',
  '68b594b1fd3c36b689df322f_DMSans-Bold.woff2': 'DMSans-Bold.woff2',
  '68b8304241af03a95254936b_Rawest-Regular.woff2': 'Rawest-Regular.woff2',
  '68b83042381df5462c1a1959_Rawest-SemiBold.woff2': 'Rawest-SemiBold.woff2',
  '68b8304261908d686602c9e0_Rawest-Light.woff2': 'Rawest-Light.woff2',
  '68b830428838c42e15fdfc8e_Rawest-Medium.woff2': 'Rawest-Medium.woff2',
  '68b83042a373ccfbdb9301de_Rawest-ExtraLight.woff2': 'Rawest-ExtraLight.woff2',
  '68b83042a9e574010ff91ae9_Rawest-Thin.woff2': 'Rawest-Thin.woff2',
  '68b83042f980bb8de9387874_Rawest-Bold.woff2': 'Rawest-Bold.woff2',
};

const cssFilePath = path.join(__dirname, 'src/styles/webflow.css');

try {
  let cssContent = fs.readFileSync(cssFilePath, 'utf8');
  console.log('[v0] Original CSS size:', cssContent.length);

  // Replace all font paths
  Object.entries(fontMapping).forEach(([oldPath, newPath]) => {
    const oldUrl = `../images/${oldPath}`;
    const newUrl = `/fonts/${newPath}`;
    
    // Replace in CSS content
    cssContent = cssContent.split(oldUrl).join(newUrl);
    console.log(`[v0] Replaced: ${oldPath} -> ${newPath}`);
  });

  fs.writeFileSync(cssFilePath, cssContent, 'utf8');
  console.log('[v0] CSS paths fixed successfully');
  console.log('[v0] New CSS size:', cssContent.length);
} catch (error) {
  console.error('[v0] Error fixing CSS paths:', error.message);
  process.exit(1);
}
