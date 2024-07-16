// import { CldUploadWidget } from 'next-cloudinary';
// import { useCallback } from 'react';
// import { ImagePlus } from 'lucide-react';


// declare global {
//   var cloudinary: any;
// }

// interface Props {
//   onChange: (value: string) => void;
//   value: string;
// }

// const ImageUpload: React.FC<Props> = ({ onChange, value }) => {
//   const handleUpload = useCallback(
//     (result: any) => {
//       onChange(result.info.secure_url);
//     },
//     [onChange]
//   );

//   return (
//     <CldUploadWidget onSuccess={handleUpload} uploadPreset="iznmrr1n" options={{ maxFiles: 1 }}>
//       {({ open }) => {
//         return (
//           <div
//             onClick={() => open()}
//             className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
//           >
//             <ImagePlus size={20} />
//             <div className="font-semibold text-lg">Click to upload</div>
//             {value && (
//               <div className=" absolute inset-0 w-full h-full">
//                 <img alt="Upload" style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={value} />
//               </div>
//             )}
//           </div>
//         );
//       }}
//     </CldUploadWidget>
//   );
// };

// export default ImageUpload;