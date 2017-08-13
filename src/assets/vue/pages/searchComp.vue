<template>  
    <f7-page>
		<f7-navbar title="Search" back-link="Back"></f7-navbar>
        <f7-block>
            <f7-searchbar
                search-list="#Phillips-list"
            
                placeholder="Search in list"
            
                :clear-button="true"
            
                @searchbar:search="onSearchP"
                @searchbar:enable="onEnableP"
                @searchbar:disable="onDisableP"
                @searchbar:clear="onClearP"
                
                class="bg-blue"
                id="searchBar"
            ></f7-searchbar>
            
            <f7-list class="searchbar-not-found">
                <f7-list-item title="Nothing found"></f7-list-item>
            </f7-list>

            
            <f7-list class="searchbar-found" id="Phillips-list">
                <f7-list-item v-for="i in items" 
                                :title="i.MaVT + ' ' +i.TenVT"
                                :data= "i"              
                                :key= "i.MaVT"
                @click="goToItem(i.MaVT)">
                </f7-list-item>
            </f7-list>
        </f7-block>
    </f7-page>
 

</template>
<script>

  export default {
    name: 'search',
    data: function () {
      return {
        items: [{}], 
      }
    },
    methods: {
      onSearchP: function (query, found) {
        console.log('search', query)
      },
      onClearP: function (event) {
        console.log('clear')
      },
      onEnableP: function (event) {
        console.log('enable')
      },
      onDisableP: function (event) {
        console.log('disable')
      },
      goToItem(i){
         this.$router.load({url:'/item/'+"viewOnly/"+i})  // open Item page with params of item.MaVT
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
                                // vm.isLoading = false
							}
                            console.log("DB loaded : " + resultSet.rows.length + " records" )

						});
					}, function (error) {
						console.log('load DB transaction error: ' + error.message);
					}, function () {
						console.log('load DB transaction ok! ')
                        
					});
				});
			},
    },
    created(){
      this.loadDB()
    } 
  }
</script>