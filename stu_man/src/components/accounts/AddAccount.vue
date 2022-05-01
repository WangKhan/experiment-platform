<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加账号</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top:60px">
      <el-row v-for="(form,index) in formArr" :key="index" >
        <el-form :model="form" :rules="addFormRules" :inline="true" ref="addAccount">
          <el-form-item label="学号" prop="id">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-input v-model="form.class"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="index!=0"
              type="danger"
              size="small"
              icon="el-icon-delete"
              circle
              @click="delFrom(index)"
            ></el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <div class="sign" style="width:700px;margin-bottom:30px;color:red">默认账号密码为123456，自动生成密码</div>
      <div style="width:700px" class="sign">
        <el-button type="primary" @click="addFormArr">新增一行</el-button>
        <el-button type="primary" @click="addAccount">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      formArr: [
        {
          id: '',
          name: '',
          identity: '1',
          class: ''
        }
      ],
      addFormRules: {
        id: [{ required: true, message: '请输入学号', trigger: 'blur' }],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        class: [{ required: true, message: '请输入班级', trigger: 'blur' }],
      },
    }
  },
  components: {

  },
  methods: {
    reset () {
      this.addForm = {
        id: '',
        name: '',
        identity: '1',
        class: ''
      }
    },
    async addAccount () {
      for(var i=0;i<this.formArr.length;i++){
        this.$refs.addAccount[i].validate(valid=>{
          if(!valid){
            this.$message.error('请补充相关信息')
            throw '信息不全'
          }
        })
      }
      try {
        await this.$http.post('/accounts/', {...this.formArr})
        this.$message.success('添加账号成功！')
      } catch (err) {
        return this.$message.error('添加账号失败！')
      }

    },
    delFrom (index) {
      this.formArr.splice(index,1)
    },
    addFormArr () {
      this.formArr.push({
        id: '',
        name: '',
        identity: '1',
        class: ''
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
