<template>
    <div style="width:300px;height:300px;background-color:pink">
        <span>{{message}}</span>
        <input type="file" name="file_name" @change="uploadFile">
    </div>
</template>

<script>
export default {
    name:'usercenter',
    data(){
       return {
           message:'个人中心'
       }
    },
    methods:{
        uploadFile(e){
            let fileUrl = e.target.files[0];
            const formdata = new FormData();
            formdata.append('file_name',fileUrl);
            fetch('/apis/02-phpApi.php',{
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body:formdata
            }).then(function(res){
                console.log(res)
            })
        }
    }
}
</script>

<style scoped>

</style>

