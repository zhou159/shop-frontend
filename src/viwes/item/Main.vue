<template>
  <div>
    <div class="top-bar">
      <div class="top-bar-button">
        <a @click="dialogShopTableVisible = true" class="s-sd" title="点击进入商店维护页面">商店维护</a>
        <a @click="dialogUnitTableVisible = true" class="s-sd" title="点击前往单位维护页面">单位维护</a>
        <a @click="dialogSpecificationTableVisible = true" class="s-sd" title="点击前往规格维护页面">规格维护</a>
      </div>
    </div>

<!--    商店列表对话框-->
    <el-dialog title="商店列表" :visible.sync="dialogShopTableVisible">
      <el-table :data="shopOptions" height="400px" border>
        <el-table-column property="shopName" label="商店名字" width="150"></el-table-column>
        <el-table-column property="shopAddress" label="地址"></el-table-column>
        <el-table-column fixed="right" label="操作" width="400">
          <template slot="header">
            <input v-model="searchShop"  placeholder="输入关键字搜索" style="height:30px" @blur="searcherShop"  @keypress.enter="searcherShop"/>
            <el-button type="primary" @click="searcherShop()" icon="el-icon-search" circle title="点击搜索商店"></el-button>
            <el-button type="primary" @click="dialogShopFormVisible = true" icon="el-icon-circle-plus" title="点击新增商店">新增商店</el-button>
          </template>
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="dialogShopUpdateFormVisible = true;updateShopTo(scope.row)" title="点击修改商店信息"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteShop(scope.row.shopId)" title="点击删除商店"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

<!--    新增商店对话框-->
    <el-dialog title="新增商店" :visible.sync="dialogShopFormVisible">
      <el-form :model="shopForm" :rules="shopRules" ref="shopForm" label-width="100px" class="demo-ruleForm" >
        <el-form-item label="商店名称" prop="shopName" ><el-input v-model="shopForm.shopName" placeholder="请输入商店名称"></el-input></el-form-item>
        <el-form-item label="商店地址" prop="shopAddress"><el-input v-model="shopForm.shopAddress" placeholder="请输入商店地址"></el-input></el-form-item>

        <el-form-item style="margin-left: 0px">
          <el-button type="primary" @click="submitShopForm('shopForm')" title="点击新增商店">新增商店</el-button>
          <el-button @click="resetForm('shopForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

<!--    修改商店信息对话框-->
    <el-dialog title="修改商店信息" :visible.sync="dialogShopUpdateFormVisible">
      <el-form :model="shopUpdateForm" :rules="shopUpdateRules" ref="shopUpdateForm" label-width="100px" class="demo-ruleForm" >
        <el-form-item label="商店名称" prop="shopName" ><el-input v-model="shopUpdateForm.shopName" placeholder="请输入商品名称"></el-input></el-form-item>
        <el-form-item label="商店地址" prop="shopAddress"><el-input v-model="shopUpdateForm.shopAddress" placeholder="请输入商品地址"></el-input></el-form-item>

        <el-form-item style="margin-left: 0px">
          <el-button type="primary" @click="updateShop()" title="点击修改商品信息">修改商品信息</el-button>
          <el-button @click="resetForm('shopUpdateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

<!--    单位列表对话框-->
    <el-dialog title="单位列表" :visible.sync="dialogUnitTableVisible">
      <el-table :data="unitOptions" height="400px" border>
        <el-table-column property="unitName" label="单位名字" width="150"></el-table-column>
        <el-table-column fixed="right" label="操作" width="400">
          <template slot="header">
            <input v-model="searchUnit"  placeholder="输入关键字搜索" style="height:30px" @blur="searcherUnit"  @keypress.enter="searcherUnit"/>
            <el-button type="primary" @click="searcherUnit()" icon="el-icon-search" circle title="点击搜索单位"></el-button>
            <el-button type="primary" @click="dialogUnitFormVisible = true" icon="el-icon-circle-plus">新增单位</el-button>
          </template>
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="dialogUnitUpdateFormVisible = true;updateUnitTo(scope.row)" title="点击修改单位信息"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteUnit(scope.row.unitId)" title="点击删除单位"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

<!--    新增单位对话框-->
    <el-dialog title="新增单位" :visible.sync="dialogUnitFormVisible">
      <el-form :model="unitForm" :rules="unitRules" ref="unitForm" label-width="100px" class="demo-ruleForm" >
        <el-form-item label="单位名称" prop="unitName" ><el-input v-model="unitForm.unitName" placeholder="请输入单位名称"></el-input></el-form-item>

        <el-form-item style="margin-left: 0px">
          <el-button type="primary" @click="submitUnitForm('unitForm')" title="点击新增单位">新增单位</el-button>
          <el-button @click="resetForm('unitForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

<!--    修改单位信息对话框-->
    <el-dialog title="修改单位信息" :visible.sync="dialogUnitUpdateFormVisible">
      <el-form :model="unitUpdateForm" :rules="unitUpdateRules" ref="unitUpdateForm" label-width="100px" class="demo-ruleForm" >
        <el-form-item label="单位名称" prop="unitName" ><el-input v-model="unitUpdateForm.unitName" placeholder="请输入单位名称"></el-input></el-form-item>

        <el-form-item style="margin-left: 0px">
          <el-button type="primary" @click="updateUnit()" title="点击修改单位信息">修改单位信息</el-button>
          <el-button @click="resetForm('unitUpdateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

<!--    规格列表对话框-->
    <el-dialog title="规格列表" :visible.sync="dialogSpecificationTableVisible">
      <el-table :data="specificationOptions" height="400px" border>
        <el-table-column property="specificationName" label="规格名字" width="150"></el-table-column>
        <el-table-column property="specificationLabel" label="规格说明"></el-table-column>
        <el-table-column fixed="right" label="操作" width="400">
          <template slot="header">
            <input v-model="searchSpecification"  placeholder="输入关键字搜索" style="height:30px" @blur="searcherSpecification"  @keypress.enter="searcherSpecification"/>
            <el-button type="primary" @click="searcherSpecification()" icon="el-icon-search" circle title="点击搜索规格"></el-button>
            <el-button type="primary" @click="dialogSpecificationFormVisible = true" icon="el-icon-circle-plus">新增规格</el-button>
          </template>
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="dialogSpecificationUpdateFormVisible = true;updateSpecificationTo(scope.row)" title="点击修改规格信息"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteSpecification(scope.row.specificationId)" title="点击删除规格"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

<!--    新增规格对话框-->
    <el-dialog title="新增规格" :visible.sync="dialogSpecificationFormVisible">
      <el-form :model="specificationForm" :rules="specificationRules" ref="specificationForm" label-width="100px" class="demo-ruleForm" >
        <el-form-item label="规格名称" prop="specificationName" ><el-input v-model="specificationForm.specificationName" placeholder="请输入规格名称"></el-input></el-form-item>
        <el-form-item label="规格说明" prop="specificationLabel"><el-input v-model="specificationForm.specificationLabel" placeholder="请输入规格说明"></el-input></el-form-item>

        <el-form-item style="margin-left: 0px">
          <el-button type="primary" @click="submitSpecificationForm('specificationForm')" title="点击新增规格">新增规格</el-button>
          <el-button @click="resetForm('specificationForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

<!--    修改规格信息对话框-->
    <el-dialog title="修改规格信息" :visible.sync="dialogSpecificationUpdateFormVisible">
      <el-form :model="specificationUpdateForm" :rules="specificationUpdateRules" ref="specificationUpdateForm" label-width="100px" class="demo-ruleForm" >
        <el-form-item label="规格名称" prop="specificationName" ><el-input v-model="specificationUpdateForm.specificationName" placeholder="请输入规格名称"></el-input></el-form-item>
        <el-form-item label="规格说明" prop="specificationLabel"><el-input v-model="specificationUpdateForm.specificationLabel" placeholder="请输入规格说明"></el-input></el-form-item>

        <el-form-item style="margin-left: 0px">
          <el-button type="primary" @click="updateSpecification()" title="点击修改规格信息">修改规格信息</el-button>
          <el-button @click="resetForm('specificationUpdateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

<!--    新增商品对话框-->
    <el-dialog title="新增商品" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
        <el-form-item label="商品名称" prop="itemName" ><el-input v-model="ruleForm.itemName" placeholder="请输入商品名称"></el-input></el-form-item>
        <el-form-item label="商品价格" prop="price"><el-input v-model="ruleForm.price" placeholder="请输入商品价格"></el-input></el-form-item>
        <el-form-item label="计量单位" prop="unit">
          <el-select v-model="ruleForm.unit" placeholder="请选择计量单位">
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
        <el-form-item label="规格数量" prop="quantity"><el-input v-model="ruleForm.quantity" placeholder="请输入规格数量"></el-input></el-form-item>
        <el-form-item label="规格" prop="specification">
          <el-select v-model="ruleForm.specification" placeholder="请选择规格">
            <el-option
                v-for="item in specificationOptions"
                :key="item.specificationId"
                :label="item.specificationName"
                :value="item.specificationId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-left: 0px">
          <el-button type="primary" @click="submitForm('ruleForm')" title="点击新增商品">新增</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

<!--    修改商品对话框-->
    <el-dialog title="修改商品" :visible.sync="dialogUpdateFormVisible">
      <el-form :model="updateForm" :rules="updateRules" ref="updateForm" label-width="100px" class="demo-ruleForm" >
        <el-form-item v-model="updateForm.itemId"></el-form-item>
        <el-form-item label="商品名称" prop="itemName" ><el-input v-model="updateForm.itemName" placeholder="请输入商品名称"></el-input></el-form-item>
        <el-form-item label="商品价格" prop="price"><el-input v-model="updateForm.price" placeholder="请输入商品价格"></el-input></el-form-item>
        <el-form-item label="计量单位" prop="unit">
          <el-select v-model="updateForm.unit" placeholder="请选择计量单位">
            <el-option
                v-for="item in unitOptions"
                :key="item.unitId"
                :label="item.unitName"
                :value="item.unitId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属商店" prop="shop">
          <el-select v-model="updateForm.shop" placeholder="请选择所属商店">
            <el-option
                v-for="item in shopOptions"
                :key="item.shopId"
                :label="item.shopName"
                :value="item.shopId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格数量" prop="quantity"><el-input v-model="updateForm.quantity" placeholder="请输入规格数量"></el-input></el-form-item>
        <el-form-item label="规格" prop="specification">
          <el-select v-model="updateForm.specification" placeholder="请选择规格">
            <el-option
                v-for="item in specificationOptions"
                :key="item.specificationId"
                :label="item.specificationName"
                :value="item.specificationId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-left: 0px">
          <el-button type="primary" @click="updateItem()">修改商品信息</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <hr>

<!--    商品表格-->
    <el-table :data="tableData" style="width: 100%" height="530px" border >
      <el-table-column fixed prop="itemName" label="名称" width="180"></el-table-column>
      <el-table-column prop="price" label="价格（￥）" width="180"></el-table-column>
      <el-table-column prop="unitName" label="计量单位" width="80"></el-table-column>
      <el-table-column prop="showQuantity" label="规格/每单位" width="100"></el-table-column>
      <el-table-column prop="itemCreateTime" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="shopName" label="店铺" width="180"></el-table-column>
      <el-table-column fixed="right" label="操作" width="400">
        <template slot="header">
          <input v-model="search"  placeholder="输入关键字搜索" style="height:30px" @blur="searcher"  @keypress.enter="searcher"/>
          <el-button type="primary" @click="searcher()" icon="el-icon-search" circle title="点击搜索商品"></el-button>
          <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-circle-plus">点击新增商品</el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="dialogUpdateFormVisible = true;updateItemTo(scope.row)" title="点击修改商品信息"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem(scope.row.itemId)" title="点击删除商品"></el-button>
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
      dialogFormVisible: false,
      dialogUpdateFormVisible:false,
      dialogShopTableVisible:false,
      dialogShopFormVisible:false,
      dialogShopUpdateFormVisible:false,
      dialogSpecificationTableVisible:false,
      dialogSpecificationFormVisible:false,
      dialogSpecificationUpdateFormVisible:false,
      dialogUnitTableVisible:false,
      dialogUnitFormVisible:false,
      dialogUnitUpdateFormVisible:false,
      tableData: [],
      ruleForm: {
        itemName: '',
        price: '',
        shop: '',
        unit: '',
        specification: '',
        quantity: ''
      },
      updateForm: {
        itemId:'',
        itemName: '',
        price: '',
        shop: '',
        unit: '',
        specification: '',
        quantity: ''
      },
      shopForm:{
        shopName:'',
        shopAddress:''
      },
      shopUpdateForm:{
        shopId:'',
        shopName:'',
        shopAddress:''
      },
      unitForm:{
        unitName:''
      },
      unitUpdateForm:{
        unitId:'',
        unitName:''
      },
      specificationForm:{
        specificationName:'',
        specificationLabel:''
      },
      specificationUpdateForm:{
        specificationId:'',
        specificationName:'',
        specificationLabel:''
      },
      search:'',
      searchShop:'',
      searchUnit:'',
      searchSpecification:'',

      shopOptions:[],
      unitOptions:[],
      specificationOptions:[],
      rules: {
        itemName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
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
          { required: true, message: '请选择计量单位', trigger: 'blur' }
        ],
        quantity:[
          { required: true, message: '请输入规格数量', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        specification:[
          { required: true, message: '请选择规格', trigger: 'blur' }
        ]
      },
      updateRules: {
        itemName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
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
          { required: true, message: '请选择计量单位', trigger: 'blur' }
        ],
        quantity:[
          { required: true, message: '请输入规格数量', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        specification:[
          { required: true, message: '请选择规格', trigger: 'blur' }
        ]
      },
      shopRules:{
        shopName: [
          { required: true, message: '请输入商店名称', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
        ],
       shopAddress: [
          { required: true, message: '请输入商店地址', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
        ]
      },
      shopUpdateRules:{
        shopName: [
          { required: true, message: '请输入商店名称', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
        ],
        shopAddress: [
          { required: true, message: '请输入商店地址', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
        ]
      },
      unitRules:{
        unitName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
        ]
      },
      unitUpdateRules:{
        unitName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
        ]
      },
      specificationRules:{
        specificationName: [
          { required: true, message: '请输入规格名称', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
        ],
        specificationLabel: [
          { required: true, message: '请输入规格说明', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
        ]
      },
      specificationUpdateRules:{
        specificationName: [
          { required: true, message: '请输入规格名称', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
        ],
        specificationLabel: [
          { required: true, message: '请输入规格说明', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
        ]
      },
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
          console.log(this.shopOptions)
        }
      });

      //获取全部单位
      this.$axios.get(this.$base_url + "unit/retrieveAllUnit").then((res) => {
        if (res.data.code!=200){
          alert("获取数据失败");
        }else {
          this.unitOptions = res.data.data
        }
      });

      //获取全部规格
      this.$axios.get(this.$base_url + "specification/retrieveAllSpecification").then((res) => {
        if (res.data.code!=200){
          alert("获取数据失败");
        }else {
          this.specificationOptions = res.data.data
        }
      });
    },
    //页面跳转
    pageTo(e){
      this.$router.push({name:e})
    },
    //主页表格中修改按钮
    updateItemTo(row) {
      this.updateForm.itemId = row.itemId
      this.updateForm.itemName = row.itemName
      this.updateForm.price = row.price
      this.updateForm.shop = row.shopId
      this.updateForm.unit = row.unitId
      this.updateForm.quantity = row.itemUnitQuantity
      this.updateForm.specification = row.specificationId
    },
    //商店表格中修改按钮
    updateShopTo(row){
      this.shopUpdateForm.shopId = row.shopId
      this.shopUpdateForm.shopName = row.shopName
      this.shopUpdateForm.shopAddress = row.shopAddress
    },
    //单位表格中修改按钮
    updateUnitTo(row){
      this.unitUpdateForm.unitName = row.unitName
      this.unitUpdateForm.unitId = row.unitId
    },
    //规格表格中修改按钮
    updateSpecificationTo(row){
      this.specificationUpdateForm.specificationId = row.specificationId
      this.specificationUpdateForm.specificationName = row.specificationName
      this.specificationUpdateForm.specificationLabel = row.specificationLabel

    },
    //修改商品对话框中修改提交按钮
    updateItem(){
      this.$axios.post(this.$base_url+"item/updateItemByItemId/"+this.updateForm.itemId,
          {
            itemName:this.updateForm.itemName,
            price:this.updateForm.price,
            shopId:this.updateForm.shop,
            unitId:this.updateForm.unit,
            specificationId:this.updateForm.specification,
            itemUnitQuantity:this.updateForm.quantity
          }).then((res)=> {
        if (res.data.code != 200) {
          this.$notify.error({
            title: '修改失败！',
            message: res.data.data,
          })
        } else {
          this.$notify({
            title: '修改成功！',
            type: 'success'
          });
          location.reload()
        }
      })
    },
    //修改商店对话框中修改提交按钮
    updateShop(){
      this.$axios.post(this.$base_url+"shop/updateShopByShopId/"+this.shopUpdateForm.shopId,
          {
            shopName:this.shopUpdateForm.shopName,
            shopAddress:this.shopUpdateForm.shopAddress,
          }).then((res)=> {
        if (res.data.code != 200) {
          this.$notify.error({
            title: '修改失败！',
            message: res.data.data,
          })
        } else {
          this.$notify({
            title: '修改成功！',
            type: 'success'
          });
          location.reload()
        }
      })
    },
    //修改单位对话框中修改提交按钮
    updateUnit(){
      this.$axios.post(this.$base_url+"unit/updateUnitByUnitId/"+this.unitUpdateForm.unitId,
          {
            unitName:this.unitUpdateForm.unitName
          }).then((res)=> {
        if (res.data.code != 200) {
          this.$notify.error({
            title: '修改失败！',
            message: res.data.data,
          })
        } else {
          this.$notify({
            title: '修改成功！',
            type: 'success'
          });
          location.reload()
        }
      })
    },
    //修改规格对话框中修改提交按钮
    updateSpecification(){
      this.$axios.post(this.$base_url+"specification/updateSpecificationBySpecificationId/"+this.specificationUpdateForm.specificationId,
          {
            specificationName:this.specificationUpdateForm.specificationName,
            specificationLabel:this.specificationUpdateForm.specificationLabel
          }).then((res)=> {
        if (res.data.code != 200) {
          this.$notify.error({
            title: '修改失败！',
            message: res.data.data,
          })
        } else {
          this.$notify({
            title: '修改成功！',
            type: 'success'
          });
          location.reload()
        }
      })
    },

    //商品表格中删除按钮
    deleteItem(itemId) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post(this.$base_url + "item/deleteByItemId/"+itemId).then((res)=>{
          if (res.data.code!=200){
            alert(res.data.data);
          }else {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            location.reload()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //商店表格中删除按钮
    deleteShop(shopId){
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post(this.$base_url + "shop/deleteByShopId/"+shopId).then((res)=>{
          if (res.data.code!=200){
            alert(res.data.data);
          }else {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            location.reload()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //单位表格中删除按钮
    deleteUnit(unitId){
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post(this.$base_url + "unit/deleteByUnitId/"+unitId).then((res)=>{
          if (res.data.code!=200){
            alert(res.data.data);
          }else {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            location.reload()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //规格表格中删除按钮
    deleteSpecification(specificationId){
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post(this.$base_url + "specification/deleteBySpecificationId/"+specificationId).then((res)=>{
          if (res.data.code!=200){
            alert(res.data.data);
          }else {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            location.reload()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //主页商品表格中搜索按钮
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
    //商品页面搜索按钮
    searcherShop(){
      this.$axios.post(this.$base_url+"shop/retrieveByShopName",
          {
            shopName:this.searchShop
          }).then((res) => {
        if (res.data.code!=200){
          alert("获取数据失败");
        }else {
          this.shopOptions = res.data.data
        }
      });
    },
    //单位页面搜索按钮
    searcherUnit(){
      this.$axios.post(this.$base_url+"unit/retrieveByUnitName",
          {
            unitName:this.searchUnit
          }).then((res) => {
        if (res.data.code!=200){
          alert("获取数据失败");
        }else {
          this.unitOptions = res.data.data
        }
      });
    },
    //规格页面搜索按钮
    searcherSpecification(){
      this.$axios.post(this.$base_url+"specification/retrieveBySpecificationName",
          {
            specificationName:this.searchSpecification
          }).then((res) => {
        if (res.data.code!=200){
          alert("获取数据失败");
        }else {
          this.specificationOptions = res.data.data
        }
      });
    },
    //新增商店提交按钮
    submitShopForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(this.$base_url+"shop/createShop",
              {
                shopName:this.shopForm.shopName,
                shopAddress:this.shopForm.shopAddress,
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
    //新增单位提交按钮
    submitUnitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(this.$base_url+"unit/createUnit",
              {
                unitName:this.unitForm.unitName
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
    //新增规格提交按钮
    submitSpecificationForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(this.$base_url+"specification/createSpecification",
              {
                specificationName:this.specificationForm.specificationName,
                specificationLabel:this.specificationForm.specificationLabel,
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
    //商品页面提交按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(this.$base_url+"item/createItem",
              {
                itemName:this.ruleForm.itemName,
                price:this.ruleForm.price,
                shopId:this.ruleForm.shop,
                unitId:this.ruleForm.unit,
                specificationId:this.ruleForm.specification,
                itemUnitQuantity:this.ruleForm.quantity
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
.s-sd{
  margin: 5px 5px 5px 5px;
  background: black;
  color: white;
  font-family: "Times New Roman";
}
.s-sd:hover{
  color: blue;
  background: white;
  font-size: 25px;
  font-family: 隶书  ;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  border-radius: 15px;
  background-clip: padding-box;
}
</style>