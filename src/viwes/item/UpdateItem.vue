<template>
  <div>
    {{this.$route.params.item}}
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品名称" prop="itemName"><el-input v-model="ruleForm.itemName"></el-input></el-form-item>
      <el-form-item label="商品价格"><el-input v-model="ruleForm.price"></el-input></el-form-item>
      <el-form-item label="单位">
        <el-select v-model="ruleForm.unit" placeholder="请选择单位">
          <el-option
              v-for="item in unitOptions"
              :key="item.unitId"
              :label="item.unitName"
              :value="item.unitId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属商店">
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
        <el-button type="primary" @click="submitForm('ruleForm')">修改信息</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "updateItem",
  data(){
    return{
      ruleForm: {
        itemName: this.$route.params.item.itemName,
        price: this.$route.params.item.price,
        shop: '',
        unit: '',
        shopName:this.$route.params.item.shopName
      },
      shopOptions:[],
      unitOptions:[],
      rules: {
        itemName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.open();
  },
  methods:{
    open(){
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

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(this.$base_url+"item/updateItemByItemId/"+this.$route.params.item.itemId,
              {
                itemName:this.ruleForm.itemName,
                price:this.ruleForm.price,
                shopId:this.ruleForm.shop == 0 || this.ruleForm.shop == null ? this.$route.params.item.shopId : this.ruleForm.shop,
                unitId:this.ruleForm.unit == 0 || this.ruleForm.unit == null ? this.$route.params.item.unitId : this.ruleForm.unit,
              }).then((res)=>{
            if (res.data.code != 200) {
              this.$notify.error({
                title: '修改失败！',
                message: res.data.data,
              });
            } else {
              this.$notify({
                title: '修改成功！',
                type: 'success'
              });
              this.$router.push('/')
            }
          })
        } else {
          return false;
        }
      });
    },
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
  margin: 5px auto;
  width: 500px;
  padding: 15px 15px 15px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>