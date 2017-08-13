<template>
  <f7-page>
		<f7-navbar :title="title" back-link="Back"></f7-navbar>
		<f7-block>
        
            <f7-preloader v-if="isLoading" color="red" ></f7-preloader>
			<div class="data-table data-table-init-card" v-else>
                 <div class="card-header">
                    <!-- Table title -->
                    <div class="data-table-title">PHILLIPS</div>
                    <!-- Table actions -->
                    <div class="data-table-actions">
                    <a class="link icon-only"><i class="material-icons">sort</i></a>
                    <a class="link icon-only"><i class="material-icons">more_vert</i></a>
                    </div>
                </div>
                <div class="card-content">
                    
                    <table>
                        <thead>
                        <tr>
                            
                            <th class="numeric-cell">Ma VT</th>
                            <th class="label-cell">Ten VT</th>
                            <th class="numeric-cell">SL Ton</th>
                            <th class="tablet-only">DVT</th>
                        </tr>
                        </thead>
                        <tbody v-for="item in items" :data="item" :key="item.STT" @click="setItem(item)"  >
                            
                            <tr>
                                
                                <td class="numeric-cell">{{ item.MaVT }}</td>
                                <td class="label-cell">{{ item.TenVT }}</td>
                                <td class="numeric-cell">{{ Number(item.K02)
                                                            +Number(item.K13)
                                                            +Number(item.K17)
                                                            +Number(item.K19)
                                 }}</td>
                                
                                <td class="tablet-only">{{ item.DVT }}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
		</f7-block>
	</f7-page>
</template>

<script>

export default{
    name: 'itemList',
    data(){
        return{
            title: "Item List View",
            items: [{}],
            item:{},
            isLoading: true
        }
    },
    methods:{
        // getItems()
        // {
        //     alasql.exec('USE inventoryDB')
        //     alasql.promise('SELECT * INTO PHILLIPS FROM JSON("/static/Phillips.json")').then((data)=>{
		// 		console.log("IMPORTING"+ data)
		// 		// this.items = data
		// 	}).catch((err)=>{
		// 		console.log(err)
		// 	})
        // },
        // getItemsAndroid(){
        //     alasql.exec('USE inventoryDB')
        //     alasql('SELECT * FROM PHILLIPS',(data)=>{
		// 		console.log("IMPORTING"+ data)
        //         if(data == 0)
        //         {
        //             alasql.promise('SELECT * INTO PHILLIPS FROM JSON("file:///android_asset/www/static/Phillips.json")').then((data)=>{
        //                 // this.items = data
        //             }).catch((err)=>{
        //                 console.log(err)
        //             })
        //         }
        //     })
            
        // },
        // getItemsFromBD()
        // {
        //     if(this.items.length<=1)
        //     {
        //         console.log("called array checking")
        //         this.isLoading =true
        //         alasql.promise('SELECT * FROM PHILLIPS').then((data)=>{
        //             // console.log("GOT DATA FROM PHILLIPS DB"+ data)
        //             this.items = data
        //             this.isLoading =false
        //         }).catch((err)=>{
        //             console.log(err)
        //         })

        //     }
        // },
        setItem(obj)
        {
          this.item = obj
          this.$router.load({url:'/item/'+"edit/"+this.item.MaVT})  // open Item page with params of item.MaVT
        },
        loadDB()
        {
            // WORKING LOAD ENTRIES FROM DB
            let vm = this
            let db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, function (db) {
            db.transaction(function (tx) {
                let query = "SELECT * FROM PHILLIPS"
                    tx.executeSql(query,null,(tx,resultSet)=>{
                        for(var x = 0; x < resultSet.rows.length; x++) {
                            console.log("MA VT" + resultSet.rows.item(x).MaVT +
                                ", TEN VT: " + resultSet.rows.item(x).TenVT+
                                ", K02: " + resultSet.rows.item(x).K02+
                                ", IMG URI: " + resultSet.rows.item(x).IMG)
                            let resObject = {}
                            resObject['MaVT'] =  resultSet.rows.item(x).MaVT
                            resObject['TenVT'] =  resultSet.rows.item(x).TenVT
                            resObject['DVT'] =  resultSet.rows.item(x).DVT
                            resObject['K02'] =  resultSet.rows.item(x).K02
                            resObject['K13'] =  resultSet.rows.item(x).K13
                            resObject['K17'] =  resultSet.rows.item(x).K17
                            resObject['K19'] =  resultSet.rows.item(x).K19
                            resObject['IMG'] =  resultSet.rows.item(x).IMG
                            vm.items.push(resObject)
                            vm.isLoading = false
                        }
                        console.log("DB loaded : " + resultSet.rows.length + " records" )
                    });
                }, function (error) {
                    console.log('load DB transaction error: ' + error.message)
                }, function () {
                    console.log("DB loaded" + vm.items)
                    
                })
            })
        },

    },
    created(){
        this.loadDB()
    },
    
}
</script>

<style lang="sass" scoped>
.data-table td
{
    padding-right: 2px;

}

</style>