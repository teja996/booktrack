// FilePond.registerPlugin(
//     FilePondPluginImagePreview,
//     FilePondPluginImageResize
//   );
//   FilePond.parse(document.body);


FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
);

FilePond.setOptions({
    stylePanelAspectRatio : 150 / 100,
    imageResizeTargetWidth : 100,
    imageResizeTargetHeight : 150,
})
  

console.log("filepond registed.....")
FilePond.parse(document.body);