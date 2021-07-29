import React from 'react'

const Uploader = () => {
  function uploadHandle(e) {
    let file = e.target.files[0]
    if(file) {
    const storageRef = firebase
    .storage()
    .ref(`songs`)
    .child(file.name)
    const task = storageRef.put(file)
    task.on(
      "state_changes",
      function progress(snap) {
        setLoading(true);
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setPercent(percentage)
      },
      function error(err) {
        window.alert('Try Again!')
      },
      function complete() {
        setLoading(false);
        storageRef.getDownloadURL().then((url) => {
          setSong({
            url: url,
            name: file.name
          })
          setLoading(false)
        });
       
      }
    )
    }
  }

  return 
}
export defualt Uploader