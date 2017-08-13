<template>
	<f7-page>
		<f7-navbar title="Add Item" back-link="Back" sliding>
			 <f7-nav-right>
                <f7-link icon-material="save" @click.prevent="checkAndSave" ></f7-link>
            </f7-nav-right>
		</f7-navbar>	
		<f7-block-title>Item Detail</f7-block-title>
		<f7-list form>
			<f7-list-item>
				<f7-label floating>Ma VT</f7-label>
				<f7-input type="text" placeholder="Ma VT" v-model="mavt"></f7-input>
			</f7-list-item>
			<f7-list-item>
				<f7-label floating>Ten VT</f7-label>
				<f7-input type="text" placeholder="Ten VT" v-model="tenvt"></f7-input>
			</f7-list-item>
			<f7-list-item>
				<f7-label floating>Don Vi Tinh</f7-label>
				<f7-input type="text" placeholder="DVT" v-model="dvt"></f7-input>
			</f7-list-item>
			<f7-list-item>
				<f7-label floating>K02</f7-label>
				<f7-input type="number" placeholder="K02" v-model="k02"></f7-input>
			</f7-list-item>
			
			<f7-list-item>
				<f7-label floating>K13</f7-label>
				<f7-input type="number" placeholder="K13" v-model="k13"></f7-input>
			</f7-list-item>
			
			<f7-list-item>
				<f7-label floating>K17</f7-label>
				<f7-input type="number" placeholder="K17" v-model="k17"></f7-input>
			</f7-list-item>
			
			<f7-list-item>
				<f7-label floating>K19</f7-label>
				<f7-input type="number" placeholder="K19" v-model="k19"></f7-input>
			</f7-list-item>
			<f7-list-item>
				<f7-label>So Luong Ton</f7-label>
				<f7-input type="number" placeholder="" :value="slton" disabled></f7-input>
			</f7-list-item>
 			<!-- img -->
			 <photoComp :uri="imgURI" @update:uri="val => imgURI = val"></photoComp>
		</f7-list>	
		
		<f7-block >
			<p>
				<f7-grid>
					<f7-col><f7-button big fill color="red" @click="clear">Clear</f7-button></f7-col>
					<f7-col><f7-button big fill color="green" @click="checkAndSave">Save</f7-button></f7-col>
				</f7-grid>
			</p>
		</f7-block>
	</f7-page>
</template>

<script>
import photoComp from './photoComp'
	export default {
	    components: { photoComp },
		computed:{
			slton:function(){
				return (Number(this.k02) +  Number(this.k13) +  Number(this.k17) +  Number(this.k19))
			}
		},
		data(){
			return{
				mavt: "",
				tenvt: "",
				dvt: "",
				k02: null,
				k13: null,
				k17: null,
				k19: null,
				table: "PHILLIPS",
				imgURI: "",
				
			}
		},
		methods:{
			checkAndSave(){
				if(this.mavt!="" && this.tenvt!="" && this.dvt!="")
				{
					this.save(this.table)
				}
				else
				{
					window.alert("Please fill empty fields", "Error")
				}
			},
			// save record to database
			save(tableName){
				let vm = this				
				window.f7.confirm("Save this record ?", "Save", function(){
				let db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, function (db,tableName) {
				db.transaction(function (tx,tableName) {
					let query = "INSERT INTO PHILLIPS (MaVT,TenVT,DVT,K02,K13,K17,K19,IMG) VALUES (?,?,?,?,?,?,?,?)"
						tx.executeSql(query,[vm.mavt,
											vm.tenvt,
											vm.dvt,
											vm.k02,
											vm.k13,
											vm.k17,
											vm.k19,
											vm.imgURI],
							function(tx,res){
								console.log("insertId: " + res.insertId )
							console.log("rowsAffected: " + res.rowsAffected )
							window.f7.alert("Successfully Added Record", "Add Record to DB")
							vm.clear()
						})
					}, function (error) {
						console.log('transaction error: ' + error.message)
					}, function () {
						console.log("Added value ")	
					})
				})
			},()=>{})

			},
			// Clear form
			clear(){
				this.mavt= ""
				this.tenvt= ""
				this.dvt= ""
				this.k02= null
				this.k13= null
				this.k17= null
				this.k19= null
				this.imgURI= ""
				
			},
			
		}
	}
</script>

<style scoped lang="sass">
#taken_photo{
	width: 100%;
	height: auto;
}
</style>