<template>
  <div div style="width: 700px; margin-top: 100px" class="sign">
    <el-upload
      class="upload-demo"
      list-type="text"
      accept=".xls,.xlsx"
      :action="UploadUrl()"
      :limit="1"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :auto-upload="false"
      :file-list="fileList"
    >
      <div style="margin: 20px">
        <el-button type="success" icon="el-icon-upload2"
          >上传Excel表格</el-button
        >
        <div class="el-upload__tip" slot="tip" style="margin: 20px">
          只能上传xlsx、xls文件，且不超过10m
        </div>
      </div>
    </el-upload>
    <div style="margin: 20px">
      <el-button @click="handleUploadFile">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    // 确定上传
    async handleUploadFile() {
      // 如果上传的文件列表是空的，给出提示
      if (this.fileList.length === 0) {
        return this.$message.warning("请先选择要上传的文件");
      }

      // 因为我们限制一次只上传1个文件，所以取数组里的第一个就可以了
      let file = this.fileList[0];
      // 获取到文件的后缀以便于判断文件类型
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      // 获取到文件的大小
      let size = file.size / 1024 / 1024;
      // 判断文件类型
      if (extension !== "xlsx" && extension !== "xls") {
        this.$message.warning("只能上传后缀是.xlsx或者.xls的文件");
        return;
      }
      // 限制上传文件的大小
      if (size > 10) {
        this.$message.warning("文件大小不得超过10M");
        return;
      }
      // 把文件转成FormData格式上传
      let dataFile = new FormData();
      dataFile.append("file", this.fileList[0]);
      // 设置请求头的 Content-type
      let config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      // 发起请求
      try{
        await this.$http.post("/batchaccounts/", dataFile, config)
        this.$message.success("添加成功");
      }catch(err){
        this.$message.error("添加失败");
      }
    },

    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
      this.fileList.push(file.raw);
    },
    // 文件超出个数限制时的钩子
    handleExceed(file, fileList) {
      return this.$message.warning("一次只能上传一个文件哦~");
    },
    //因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
    UploadUrl() {
      return "";
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
  },
};
</script>

<style>
</style>