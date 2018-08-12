<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="名称">
	    <el-col :span="12">
          <el-input v-model="form.name"></el-input>
		</el-col>
        </el-form-item>
	  <el-form-item label="描述">
	    <el-col :span="12">
            <el-input type="textarea" v-model="form.description"></el-input>
		</el-col>
        </el-form-item>
        <el-form-item label="类型">	  
          <el-select v-model="form.category" placeholder="请选择类型">
            <el-option label="Common" value="0"></el-option>
            <el-option label="Business" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用图标">
          <el-col :span="12">
            <el-input v-model="form.icon"></el-input>
		</el-col>
        </el-form-item>
        <el-form-item label="总代理数量">
	    <el-col :span="12">
            <el-input type="number" v-model="form.numberOfDelegates"></el-input>
		</el-col>
        </el-form-item>
	  <el-form-item label="解锁代理数量">
	    <el-col :span="12">
            <el-input type="number" v-model="form.unlockDelegates"></el-input>
		</el-col>
        </el-form-item>
        <el-form-item label="资源文件">
	    <el-upload  accept="application/x-zip-compressed"
		  :before-upload="onBeforeUpload"
      :limit="3"
		  action="http://127.0.0.1:9090/api/dapp/upload.do">
		  <el-button size="small" type="primary">点击上传</el-button>
		</el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">创建</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
        form: {
          name: '',
          description: '',
          category: '',
          icon: '',
          numberOfDelegates: 5,
          unlockDelegates: 3,
		  files: [],
		  fileName: '',
		  fileSize: 0,
		  fileType: '',
		  reqs: {}
        }
    }
  },
  methods: {
    onBeforeUpload(file)
    {
		if (this.form.files.length > 0){
			this.$message.error('最多只能上传1个文件!');
			return false;
		}
        const isZip = file.type === 'application/x-zip-compressed';
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isZip) {
          this.$message.error('上传文件只能是压缩格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传文件大小不能超过 1MB!');
        }
		this.form.files.push(file)
        return isZip && isLt1M;
    },
	post(rawFile) {
        const { uid } = rawFile;
        // 上传文件的参数与回调函数
        const options = {
          //headers: this.headers,
          //withCredentials: this.withCredentials,
          file: rawFile,
          //data: this.data,
          //filename: this.name,
          //action: this.action,
          onProgress: e => {
        	 this.onProgress(e, rawFile);
          },
          onSuccess: res => {
        	this.onSuccess(res, rawFile);
        	delete this.reqs[uid];
          },
          onError: err => {
        	this.onError(err, rawFile);
        	delete this.reqs[uid];
          }
		};
		// 上传
		const req = this.httpRequest(options);
		this.reqs[uid] = req;
		// 返回结果
		if (req && req.then) {
          req.then(options.onSuccess, options.onError);
		}
	},
    onSubmit() {
	  //console.log(this.form)
      this.$message('submit!')
    },
	onSuccess(res, rawFile) {
	},
	onError(err, rawFile) {
	},
    onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

