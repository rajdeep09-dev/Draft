import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..');

const imagesToCopy = [
  '68b58ec383c7eab030ec6c97_Webflow-20Background.svg',
  '68b58ec383c7eab030ec6c9a_chevron-down-white.svg',
  '68b58ec383c7eab030ec6c9b_chevron-down.svg',
  '68b82b71f7a9917b0bbbe061_Line-20598.png',
  '68b87a8027726c0a70346c62_Vector-204.svg',
  '68b87c17be258ef7f95cf462_Vector-2013-20(1).svg',
  '68b992e8e96c85f70daf0fd7_Group-201000005731.svg',
  '68ba86e665dd5a705eed94f2_6ef882b25eea3735fba6543b93bc6d55_Group-20-282-29.svg',
  '68ba87e9b2df81a4d964d1b4_Group-20(3).svg',
  '68ba893730b9095cf800eccb_Group-20(4).svg',
  '68bb4981bc3483152169d1ce_Vector-2022.svg',
  '68bb4f94b332f5a4bcbcb819_Line-20599.svg',
  '68be82c86450f4d17d139f10_Group-20(5).svg',
  '68be89295a57cfa9bf9934cd_Line-20601.png',
  '68c114f0e008e4ffa4cd8b7c_icon_close-modal.svg',
  '68c27c65c0ea70bea3999361_linesvg3.png',
  '68c2aafc42803958bb2b3772_Line-20626.svg',
  '68ca8b63afcf4d500eaabed0_ffa2ee9e3c2b48d076483d439539e394_Frame-202147227507.svg',
  '68cc471050eac9188cef574d_Group-201000005732-20(1).svg',
  '68cc479311fc78929ac4f247_Group-20(9).svg',
  '68d39b1a4d3f3583775d7162_NRL-201.png',
  '68d3a510b646d64ff0edecd6_Rectangle-2034625590-20(2).png',
  '68d3a8764e0a49d808854825_truecaller.svg',
  '68d3a88e3e44ef4194442e8b_pluto.svg',
  '68d3a940424ce014d76465c1_hiver-20(1).svg',
  '68d3a9b8654724f2e1b04dde_clueso.svg',
  '68d3aa842257b49eb73be70e_skydo-20(1).svg',
  '68d4d5e139ec9007917ced52_presentation-projector-screen-bars-Streamline-Freehand.svg',
  '68d4d5ee303aa30537c88296_task-list-pen-Streamline-Freehand.svg',
  '68d4d5ff9951cf53bc6c05a0_worldwide-web-browser-Streamline-Freehand.svg',
  '68d4d615cfd384791c372707_presentation-audience-Streamline-Freehand.svg',
  '68d4d676e58578b3a5fcb216_worldwide-web-network-www-Streamline-Freehand.svg',
  '68d4d68743123eb627a500c6_smiley-shine-big-eyes-Streamline-Freehand.svg',
  '68d4d70352e1990acd7306d6_seo-search-graph-Streamline-Freehand.svg',
  '68d526ea3cc851d3be6d0fb0_Frame-202147224813-20(1).png',
  '68d52be22760984ad46d9c2c_Frame-202147224813-20(3).png',
  '68d68c686225f859d21a7202_Jetri-20GIF.png',
  '68da544630e8330952e4083a_figma_logo_icon_171159.svg',
  '68da5488680e79b7b36e1fd9_descript-seeklogo.svg',
  '68da54ba1a3b1c60b6a50e2f_jasper-seeklogo.svg',
  '68da55673395504fbcb7b51f_frase.svg',
  '68da565e88d5ed0743175000_Frame-20(2).svg',
  '68da569414a43e6ce627f662_Frame-201984077664.svg',
  '68da56d5b7a04f2e02da4945_Frame-201984077664-20(1).svg',
  '68da56f2b1212907909b96bc_Frame-201984077659.svg',
  '68da570b4126036ff566af15_Frame-201984077645.svg',
  '68da57998dbb4dd69e9e0896_Frame-20(3).svg',
  '68da57e789e1be722a118e0a_Frame-20(4).svg',
  '68da590e2df2733052d7bf4b_Klue_Logo_B.svg',
  '68da5960db7ff5100edc8f3d_Sprout-Social-Logo-Horizontal-Lockup-201.svg',
  '68da59aa432de688d8136ef3_Frame-20(5).svg',
  // AVIF images
  '68b83ee470b1bb543cf2fb47_Rectangle-2034625588.avif',
  '68b880a15ac49e942b7bc28b_Frame-202018776396.avif',
  '68b99188c1cc003643a67dd6_Group-20(1).avif',
  '68babe691a46f898ad7aa29a_Rectangle-2034625595.avif',
  '68bb539e7dd47e375537aa7d_Line-20599.avif',
  '68be8a3c0608741a2f616c9e_Frame-202018776383.avif',
  '68bfa4ef4c4f014bc9dc7984_Group-2023-20(1).avif',
  '68bfa518a180105c778d2024_Group-2023-20(2).avif',
  '68c11acf0455ea340f29f7e5_6646e5b9344d79e99a1628da_Frame-201984077672-201.avif',
  '68c11adc4ff0185640efe85b_6646e5b96a4be92554d39b23_image-2060-201.avif',
  '68c11aebf6b7d95798e62d02_6646e5bba76426f64c5043f5_Frame-201984077649-201.avif',
  '68c11aff9f50f6e3b74b180a_6646e508892d5c9435d8cbb4_Frame-201984077673-201.avif',
  '68c2c1fa1710dd7295d85e0d_Frame-202018776408.avif',
  '68c2c1fa4c5ad79c470d1db3_Frame-202018776414.avif',
  '68c2c1fa4f1175cd56b1973a_Frame-202018776404.avif',
  '68c2c1fa78af5993ae4125f3_Frame-202018776413.avif',
  '68c2c1fa7ef265dc9d0f85f8_Frame-202018776399.avif',
  '68c2c1fa99715e0b55399995_Frame-202018776409.avif',
  '68c2c1facf091d4eb990e8d1_56ecf1980fcbad2e204253608a02afbe_Frame-202018776402.avif',
  '68c2c1faedbae5796e742e67_Frame-202018776398.avif',
  '68c2c1fb90b6938c66613504_Frame-202018776406.avif',
  '68c2c1fba575a9df6191712c_Frame-202018776403.avif',
  '68c2c1fbbc2fd1ef3db680b3_Frame-202018776411.avif',
  '68c2c25f9b3fcc9a5664a572_8834d8f280a4cbd6f8e0de9ff01754a6_image-2041.avif',
  '68cc644bf8403c20bc88cec9_Detail.avif',
  '68cd32c724442bd8b0e914aa_Mohamed-Ridwan-Pluto-removebg-preview.avif',
  '68cd330bd651649749276bd5_Adobe-20Express-20-20file-20(1).avif',
  '68cd3327a9f10ca63020909b_Adobe-20Express-20-20file.avif',
  '68d148d103d38559e61951e1_4d36c74a1faf45f6ce1b288e9051a5ff_Frame-202018776402.avif',
  '68d148d1e29ef3db8bae4a23_Frame-202147227518.avif',
  '68d39cb64dc9ad31a384826f_68ce3eb1dfec0b28f263c463_LinCoverPostDownload.avif',
  '68d4e8eac4d0d85818e803c8_01b53e22f20843cb9c545e3036771c1bb0b26d32.avif',
  '68da5370ee5fe7120b997f57_d6f8824fdce814a6acb539f411332ab42a020484.avif',
  '68da5592f8a4ebe55649cf78_Frame-201984077659.avif',
  '68da5735810ef43a5e4171eb_Frame-201984077663-20(1).avif',
  '68da582c51b36480542a7648_-41b7df259e181179ec6cf7184d77bffe.avif',
  '68da585a31c52e878d3e6db2_Framer_Logo_Core.avif',
  '68da5882cdc8f3c612845568_Frame-201984077668.avif',
  '68da58a6efa72bd384b2dad6_Frame-201984077674.avif',
  '68da58c69d46787217faa06f_Frame-201984077645.avif',
  '68da592649d820ee03ff2a3f_1_1-20Size.avif',
  '68da5d44538eadde62a8a0c9_Anthony-20P.avif',
  '68da5d7aff82cde55284f40f_2.avif',
  '68da70dbba6e870446c60543_4a232be58ec299dadfe95c8b6aed61ee_Line-20627.avif',
];

const copyFiles = () => {
  imagesToCopy.forEach(filename => {
    const source = path.join(PROJECT_ROOT, 'images', filename);
    const dest = path.join(PROJECT_ROOT, 'public', 'images', filename);
    
    if (fs.existsSync(source)) {
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(source, dest);
      console.log(`✓ Copied ${filename}`);
    } else {
      console.log(`✗ File not found: ${filename}`);
    }
  });
};

copyFiles();
console.log('Asset migration complete!');
