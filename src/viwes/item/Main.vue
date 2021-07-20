<template>
  <div>
    <div class="top-bar">
      <div class="top-bar-button">
        <span style="background: black;color: blue" @click="pageTo('/shopMain')" class="s-sd" title="点击前往商店维护页面">商店维护</span>
      </div>
    </div>
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
      <el-form-item label="商品名称" prop="itemName" ><el-input v-model="ruleForm.itemName" ></el-input></el-form-item>
      <el-form-item label="商品价格" prop="price"><el-input v-model="ruleForm.price"></el-input></el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-select v-model="ruleForm.unit" placeholder="请选择单位">
          <el-option
              v-for="item in unitOptions"
              :key="item.unitId"
              :label="item.unitName"
              :value="item.unitId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="所属商店" prop="shop">
        <el-select v-model="ruleForm.shop" placeholder="请选择所属商店">
          <el-option
              v-for="item in shopOptions"
              :key="item.shopId"
              :label="item.shopName"
              :value="item.shopId">
          </el-option>
        </el-select>

      </el-form-item>

      <el-form-item style="margin-left: 0px">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <hr>

    <el-table :data="tableData" style="width: 100%" height="530px" border >
      <el-table-column fixed prop="itemName" label="名字" width="180"></el-table-column>
      <el-table-column prop="price" label="价格（￥）" width="180"></el-table-column>
      <el-table-column prop="unitName" label="单位" width="50"></el-table-column>
      <el-table-column prop="itemCreateTime" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="shopName" label="店铺" width="180"></el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="400">
        <template slot="header">
          <input v-model="search"  placeholder="输入关键字搜索" style="height:30px" @blur="searcher"  @keypress.enter="searcher"/>
          <el-button type="primary" @click="searcher()" icon="el-icon-search" circle></el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="updateItem(scope.row)" ></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem(scope.row.itemId)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "main",
  data() {
    return {
      tableData: [],
      ruleForm: {
        itemName: '',
        price: '',
        shop: '',
        unit: ''
      },
      search:'',
      shopOptions:[],
      unitOptions:[],
      rules: {
        itemName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        shop: [
          { required: true, message: '请选择所属商店', trigger: 'blur' }
        ],
        unit:[
          { required: true, message: '请选择单位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.open()
  },
  methods:{
    //查询全部item
    open:function (){
      //获取全部item
      this.$axios.get(this.$base_url + "item/retrieveAllItem").then((res) => {
        if (res.data.code!=200){
          alert("获取数据失败");
        }else {
          console.log(res.data.data)
          this.tableData = res.data.data
        }
      });

      //获取全部商店
      this.$axios.get(this.$base_url + "shop/retrieveAllShop").then((res) => {
        if (res.data.code!=200){
          alert("获取数据失败");
        }else {
          console.log(res.data.data)
          this.shopOptions = res.data.data
        }
      });

      //获取全部单位
      this.$axios.get(this.$base_url + "unit/retrieveAllUnit").then((res) => {
        if (res.data.code!=200){
          alert("获取数据失败");
        }else {
          console.log(res.data.data)
          this.unitOptions = res.data.data
        }
      });
    },
    //页面跳转
    pageTo(e){
      this.$router.push(e)
    },
    //修改按钮
    updateItem(row) {
      this.$router.push({name:'updateItem',params:{item:row}})
    },
    //删除按钮
    deleteItem(itemId) {
      this.$axios.post(this.$base_url + "item/deleteByItemId/"+itemId).then((res)=>{
        if (res.data.code!=200){
          alert(res.data.data);
        }else {
          this.$notify({
            title: '删除成功！',
            type: 'success'

          });
          location.reload()
        }
      })
    },
    //搜索按钮
    searcher(){
      this.$axios.post(this.$base_url+"item/retrieveByItemName",
          {
            itemName:this.search
          }).then((res) => {
        if (res.data.code!=200){
          alert("获取数据失败");
        }else {
          this.tableData = res.data.data
        }
      });
    },
    //提交按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(this.$base_url+"item/createItem",
              {
                itemName:this.ruleForm.itemName,
                price:this.ruleForm.price,
                shopId:this.ruleForm.shop,
                unitId:this.ruleForm.unit
              }).then((res)=>{
                if (res.data.code != 200) {
                  this.$notify.error({
                    title: '新增失败！',
                    message: res.data.data,
                  });
                } else {
                  this.$notify({
                    title: '新增成功！',
                    type: 'success'
                  });
                  location.reload()
                }
              })
        } else {
          return false;
        }
      });
    },
    //重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }

}
</script>

<style scoped>
.demo-ruleForm {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 15px auto;
  width: 500px;
  padding: 25px 25px 25px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.top-bar{
  width: 100%;
  height: 50px;
  background: black;
  margin-top: 0;
  padding-top:0px ;
}
.top-bar-button{
  float: right;
  margin-right: 20px;
  margin-top: 15px;
}

</style>