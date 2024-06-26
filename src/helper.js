export const parseSafe = (str) => {
  try {
    const result = JSON.parse(str)

    return result
  } catch (e) {
    return undefined
  }
}

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => resolve(reader.result)

    reader.onerror = (error) => reject(error)
  })

export const timeDifference = (pastTime) => {
  try {
    const currentTime = new Date();
    const timeDiffInMs = currentTime.getTime() - pastTime.getTime();

    const days = Math.floor(timeDiffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiffInMs % (1000 * 60)) / 1000);
    
    return {
      days,
      hours,
      minutes,
      seconds
    };
  } catch (e) {
    return undefined
  }
}