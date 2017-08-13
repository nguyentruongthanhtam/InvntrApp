<template>
            <f7-list-item>
                <f7-grid>
                    <f7-col>
                       <img :src="uri" alt="" id="taken_photo">
                       <f7-button big  color="red" @click="getPhoto">Get from device</f7-button>
                    </f7-col>
                    <f7-col>
                       <f7-button big fill color="green" @click="takePhoto">Take Photo</f7-button>   
                    </f7-col>
                </f7-grid>
                
            </f7-list-item>
</template>

<script>
    export default{
        props:['uri'],
        data(){
            return{

            }
        },
        methods:
        {
            getPhoto()
            {
                let vm = this
                window.imagePicker.getPictures(
                    function(results) {
                        for (var i = 0; i < results.length; i++) {
                            console.log('Image URI: ' + results[i])
                            vm.$emit('update:uri',results[i])

                        }
                    }, function (error) {
                        console.log('Error: ' + error)
                    }, {
                        maximumImagesCount: 1
                        
                    }
                );
            },
            takePhoto(){
                let vm = this
                navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
                    destinationType: Camera.DestinationType.FILE_URI,
                    saveToPhotoAlbum: true
                     });

                function onSuccess(imageURI) {
                    var image = document.getElementById('taken_photo');
                    image.src = imageURI;
                    vm.$emit('update:uri',imageURI)
                }

                function onFail(message) {
                    alert('Failed because: ' + message);
                }
            }
        }
    }
</script>
<style scoped lang="sass">
#taken_photo{
	width: 100%;
	height: auto;
}
</style>