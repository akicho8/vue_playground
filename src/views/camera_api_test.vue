<template lang="pug">
.camera_api_test
  h2.title {{current_title}}
  hr

  .box
    video(id="video" autoplay playsinline)

  .box
    //- form(action="" method="POST" enctype="multipart/form-data")
    p
      | デフォルト
      input(type="file")
    p
      | 背面カメラ起動
      input(type="file" capture="environment")

</template>

<script>
export default {
  name: "camera_api_test",
  data() {
    return {
    }
  },
  mounted() {
    const medias = {
      audio: false,
      video: {
        facingMode: {
          exact: "environment" // リアカメラにアクセス
        }
      }
    };

    const video = document.getElementById("video")
    const promise = navigator.mediaDevices.getUserMedia(medias)
    promise.then(stream => video.srcObject = stream).catch(error => alert(error))
  },
}
</script>

<style lang="sass">
.camera_api_test
  #video
    display: block
    width: 100%
</style>
