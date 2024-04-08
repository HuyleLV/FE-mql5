
export const isImageOrVideo = (url) => {
    var extension = url?.split('.').pop().toLowerCase();
    var imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    var videoExtensions = ['mp4', 'avi', 'mov'];
  
    if (imageExtensions.indexOf(extension) !== -1) {
      return 'image';
    } else if (videoExtensions.indexOf(extension) !== -1) {
      return 'video';
    } else {
      return 'unknown';
    }
}