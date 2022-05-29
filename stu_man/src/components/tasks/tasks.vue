<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>实验进度</el-breadcrumb-item>
      <el-breadcrumb-item>实验题目</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card v-for="(item,i) in tasksStatus" :key=i class="tasksName" shadow="hover">
      <div style="width:80%;height:100%" class="task"  @click="go(i)">{{tasksName[i]}}</div>
      <el-tag v-if='tasksStatus[i]===0' type="info" class="tag" @click="changeStatus(i)">未开始</el-tag>
      <el-tag v-else-if='tasksStatus[i]===1' class="tag" @click="changeStatus(i)">进行中</el-tag>
      <el-tag v-else-if='tasksStatus[i]===2' type="success" class="tag">已完成</el-tag>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'tasks',
  data() {
    return {
      tasksStatus:[0,0,0,0,0,0],
      tasksName:['实验1 Python数字图像处理初步','实验2  图像的代数运算','实验3 几何变换','实验4 直方图','实验5 滤波处理','实验6 高级特性（形态学+图像分割+彩色图像处理）'],
      BaseUrl:'http://52.24.79.132/user/test/notebooks/task1.ipynb',
      id:''
    }
  },
  components: {

  },
  methods: {
    go(index){
      if(this.tasksStatus[index]==0){
        this.$set(this.tasksStatus,index,1)
        this.updateTaskStatus()
      }
      window.open(`http://52.24.79.132/user/${this.id}/notebooks/experiment_material/tasks/task${index+1}.ipynb`,"_blank");
    },
    async getTaskStatus(){
       try {
        const { data: res } = await this.$http.get('/profile/task/' + this.id)
        this.tasksStatus=Object. values(res.data)
      } catch (err) {
        return this.$message.error('获取任务进度失败！')
      }
    },
    changeStatus(i){
      if(this.tasksStatus[i]==1){
        this.$set(this.tasksStatus,i,2)
        this.updateTaskStatus()
      }
    },
    async updateTaskStatus(){
       try {
          await this.$http.post('/profile/task/' + this.id, {
            task1: this.tasksStatus[0],
            task2: this.tasksStatus[1],
            task3: this.tasksStatus[2],
            task4: this.tasksStatus[3],
            task5: this.tasksStatus[4],
            task6: this.tasksStatus[5],
          })
        } catch (err) {
          return this.$message.error('更新任务进度失败！')
        }
    }
  },
  created() {
    this.id = window.sessionStorage.getItem('id')
    this.getTaskStatus()
  }
}
</script>

<style scoped lang="less">
  .tasksName {
    margin-bottom:30px;
    font:240px;
    height: 60px;
    width: 900px;
    .task{
      float: left;
    };
    .tag{
      float: right;
      margin: -5px;
      width: 80px;
      text-align: center;
    }
  }
</style>
