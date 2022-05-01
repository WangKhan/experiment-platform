
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>进度监控</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <!-- 查询账号的搜索框 -->
        <el-col :span="8">
          <el-input
            placeholder="请根据学号搜索"
            v-model="queryInfo.query"
            clearable
            @clear="getAccountList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getAccountList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 账号列表区域 -->
      <el-table :data="accountList" border stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="学号" prop="id" width="120px"></el-table-column>
        <el-table-column label="姓名" prop="name" width="70px"></el-table-column>
        <el-table-column v-for='index of 6' :key='index' :label="'实验'+index" min-width="50px" :prop="'task'+index">
          <template v-slot="scope">
            <p v-if="hasScore(scope.row,index)">
              {{scope.row[`task${index}sco`]}}
            </p>
            <p v-else>
              {{TaskStatus[scope.row[`task${index}`]]}}
              <el-button
                type="primary"
                style="margin-left:10px"
                size="small"
                @click="grade(scope.row,index)"
                v-if='scope.row[`task${index}`]==2'
              >评分</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- <el-card>
      <div class="sign" style="width: 80%"><h3>统计数据</h3></div>
      <el-table  border stripe style="width: 80%">
        <el-table-column label="实验1" min-width="50px"></el-table-column>
        <el-table-column label="实验2" min-width="50px"></el-table-column>
        <el-table-column label="实验3" min-width="50px"></el-table-column>
        <el-table-column label="实验4" min-width="50px"></el-table-column>
        <el-table-column label="实验5" min-width="50px"></el-table-column>
        <el-table-column label="实验6" min-width="50px"></el-table-column>
      </el-table>
    </el-card>-->
    <el-dialog title="评分" :visible.sync="dialogTableVisible" width="500px">
      <el-form>
        <el-form-item label="分数">
          <el-input v-model="score" autocomplete="off" width="100px"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取账号列表的参数对象
      queryInfo: {
        // 搜索框输入的内容
        query: '',
        // 每页的数据条数(默认每页显示3条)
        pagesize: 3,
        // 页号(默认是第一页)
        pagenum: 1
      },
      // 账号列表数据
      accountList: [],
      // 账号的总数
      total: 0,
      TaskStatus: {
        0: '未开始',
        1: '进行中',
        2: '已完成'
      },
      score: '',
      dialogTableVisible: false,
      index:'',
      rowid:''
    }
  },
  created () {
    this.getAccountList()
  },
  methods: {
    // 根据queryInfo获取所有账号
    async getAccountList () {
      try {
        const { data: res } = await this.$http.get('/accounts', {
          params: this.queryInfo
        })
        // 这里的total始终是数据库中的账号总数
        this.total = res.data[res.data.length - 1].length
        res.data.pop()
        this.accountList = res.data
        // this.accountList = res.data.map((item)=>{
        //   item.task1=TaskStatus[item.task1]
        //   item.task2=TaskStatus[item.task2]
        //   item.task3=TaskStatus[item.task3]
        //   item.task4=TaskStatus[item.task4]
        //   item.task5=TaskStatus[item.task5]
        //   item.task6=TaskStatus[item.task6]
        //   return item})
      } catch (err) {
        return this.error('获取账号列表失败！')
      }
    },
    // 监听pagesize改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getAccountList()
    },
    // 监听pagenum改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getAccountList()
    },
    grade (row, index) {
      this.rowid=row.id
      this.index=index
      this.dialogTableVisible=true;
    },
    cancel (){
      this.dialogTableVisible=false;
      this.score=''
      this.rowid=''
      this.index=''
    },
    async submit () {
      try {
        const { data: res } = await this.$http.post('/accounts/grade', {
          id: this.rowid,
          index: this.index,
          score: this.score
        })
        this.rowid=''
        this.index=''
        this.score=''
        this.dialogTableVisible=false
        this.getAccountList()
      }
      catch (err) {
        this.$message.error('评分失败')
      }
    },
    hasScore(row,index){
      if(row[`task${index}sco`]){
        return true
      }
      else{
        return false
      }
    }
  }
}
</script>

<style scoped>
</style>
