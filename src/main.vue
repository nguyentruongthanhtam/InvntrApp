<template>
	<!-- App -->
	<div id="app">
		
		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>
		
		<!-- Left Panel -->
		<f7-panel left reveal layout="dark">
			<f7-view id="left-panel-view" navbar-fixed>
				<f7-navbar title="Control Center"></f7-navbar>
				<f7-pages>
					<f7-page>
						
						
						<f7-list>
							<f7-list-item link="/about/" title="About"></f7-list-item>
							
						</f7-list>
						
						<f7-list>
							<f7-list-item link="/items/" title="Items" link-view="#main-view" link-close-panel></f7-list-item>
							<f7-list-item title="drop table" @click.prevent="dropDB"></f7-list-item>
						</f7-list>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-panel>
		
		
		<!-- Main Views -->
		<f7-views>
			<f7-view id="main-view" main theme="black">
				<!-- Pages -->
				<f7-pages navbar-fixed >
						
					<f7-page>
						<f7-navbar class="bg-black">
							<f7-nav-left>
								<f7-link icon="icon-bars" open-panel="left"></f7-link>
							</f7-nav-left>

							<f7-nav-center sliding>Invntr</f7-nav-center>

							<f7-nav-right>
								<f7-link icon-material="info" href="/about/"></f7-link>
							</f7-nav-right>
						</f7-navbar>
						<f7-page-content>
							<f7-block>
								<p><f7-button @click.prevent href="/items/" fill big>List</f7-button></p>
								<p><f7-button @click.prevent href="/search/" fill  big>search</f7-button></p>
							</f7-block>
						</f7-page-content>
						<f7-fab color="pink" href="/form/" @click.prevent>
							<f7-icon icon="icon-plus"></f7-icon>
						</f7-fab>
					</f7-page>
				</f7-pages>
			</f7-view>
			
		</f7-views>
		
		<!-- Popup -->
		<f7-popup id="popup">
			<f7-view navbar-fixed>
				<f7-pages>
					<f7-page>
						<f7-navbar title="Popup">
							<f7-nav-right>
								<f7-link :close-popup="true">Close</f7-link>
							</f7-nav-right>
						</f7-navbar>
						<f7-block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.</f7-block>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-popup>
		
		<!-- Login Screen -->
		<f7-login-screen id="login-screen">
			<f7-view>
				<f7-pages>
					<f7-page login-screen>
						<f7-login-screen-title>Login</f7-login-screen-title>
						<f7-list form>
							<f7-list-item>
								<f7-label>Username</f7-label>
								
							</f7-list-item>
							<f7-list-item>
								<f7-label>Password</f7-label>
								
							</f7-list-item>
						</f7-list>
						<f7-list>
							<f7-list-button title="Sign In" close-login-screen></f7-list-button>
							<f7-list-label>
								<p>Click Sign In to close Login Screen</p>
							</f7-list-label>
						</f7-list>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-login-screen>
	
	</div>
</template>

<script>
	//   import alasql from './static/alasql.min.js'
	// require('/static/alasql.min.js')
	
	export default{
		data(){
			return{
				dbLoaded : false				
				
			}

		},
		methods:{
			loadDB()
			{
				// WORKING LOAD ENTRIES FROM DB
				let db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, function (db) {
				db.transaction(function (tx) {
					let query = "SELECT * FROM PHILLIPS WHERE MaVT NOT NULL"
						tx.executeSql(query,null,(tx,resultSet)=>{
							for(var x = 0; x < resultSet.rows.length; x++) {
								console.log("MA VT: " + resultSet.rows.item(x).MaVT +
									", TEN VT: " + resultSet.rows.item(x).TenVT+
									", K02: " + resultSet.rows.item(x).K02+
									", IMG URI: " + resultSet.rows.item(x).IMG)
							}

						})
					}, function (error) {
						console.log('load DB transaction error: ' + error.message)
					}, function () {
						console.log("DB loaded")
					})
				})
			},
			dropDB(){
				let vm = this 
				document.addEventListener('deviceready', function() {
				let db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, function (db) {
					db.transaction(function (tx) {
						tx.executeSql('DROP TABLE IF EXISTS PHILLIPS')
						console.log("TABLE PHILLIPS DROPPED")
						window.f7.alert("Successfully Delete Table", "DROP TABLE?")
					}, function (error) {
						console.log('transaction error: ' + error.message)
					}, function () {
						console.log('DROP TABLE transaction ok')
					});

				}, function (error) {
					console.log('Open database ERROR: ' + JSON.stringify(error))
					})
				})
			
			}
			

		},
		created(){
			// let db = new alasql.Database('inventoryDB')
			// db.exec('USE inventoryDB')
			// db.exec('CREATE TABLE IF NOT EXISTS PHILLIPS ( STT , MaVT , TenVT , DVT , K13 , K02 , K17 , K19 , SLTon ,IMG )')	
			
			// if(db.tables.PHILLIPS) this.dbLoaded = true
			// // console.log(db.tables.PHILLIPS)
			// alasql.promise('SELECT * FROM PHILLIPS').then((data)=>{
			// 	console.log(data)
			// }).catch((err)=>{
			// 	console.log(err)
			// })

			//DATABASE INIT
			let vm = this 
			document.addEventListener('deviceready', function() {
				let db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, function (db) {
					let query = `
						CREATE TABLE IF NOT EXISTS PHILLIPS 
						(	ID INTEGER PRIMARY KEY AUTOINCREMENT,
							MaVT CHAR(20) NOT NULL, 
							TenVT CHAR(30) NOT NULL, 
							DVT CHAR(20) NOT NULL,
							HD CHAR(20), 
							K02 INTEGER, 
							K13 INTEGER, 
							K17 INTEGER, 
							K19 INTEGER, 
							IMG TEXT,
							EXTRA TEXT
						)
					`
					db.transaction(function (tx) {

						// tx.executeSql('DROP TABLE IF EXISTS PHILLIPS')
						tx.executeSql(query)
					}, function (error) {
						console.log('transaction error: ' + error.message)
					}, function () {
						console.log('CREATE TABLE transaction ok')
						vm.dbLoaded = true
					});

				}, function (error) {
					console.log('Open database ERROR: ' + JSON.stringify(error))
				})
			})
			
		
			// document.addEventListener("backbutton",onBackKeyDown, false);
			// function onBackKeyDown() {
			// 	// Handle the back button
			// 	console.log("BACK BUTTON PRESS")
			// 	vm.$router.back()
			// }
		}
	}
</script>
