<?php 
session_start();
error_reporting(0);
$siteRoot = '/';
$adminEmail = 'youremail@website.com';
$adminUsername = 'rwadholm';
$adminPassword = 'SomePa55w0rdThat15K1nd0Fhard!';
$pageName = $_REQUEST['page'];
$page = preg_replace('/\//','___',$pageName);
$page = preg_replace('/\.(.*)$/','',$page);
$page = preg_replace('/(.*)___$/','$1', $page);
$editID = $_REQUEST['id'];
$editValue = $_REQUEST['value'];
$deletePage = $_REQUEST['deletePage'];

if(isset($_SESSION['contactID'])){
	$contactID = $_SESSION['contactID'];
} else {	
	$contactID = get_random_string();
	$_SESSION['contactID'] = $contactID;
}

$loginError = '<p style="color: #900;">Wrong username or password.</p>';
$noPageError = "<h1>404</h1><p>We are sorry, you have somehow navigated to a page that does not exist.</p>";
$contactError = "";
$contactSuccess = "";
$editPageMessage = "<h1>No Current Page</h1><p>We are sorry, but this page does not exist yet or has been deleted. If you would like to create a page at this URL, just click here and edit this content. Add any content you want, then link to it from another page.</p>";

// Authentication
if(!$_SESSION['admin'] || $_SESSION['admin'] == false){
	$username = $_REQUEST["vip"];
	$password = $_REQUEST["vipp"];
	
	if($username == $adminUsername && $password == $adminPassword){
		$_SESSION['admin'] = true;
		$admin = true;
	} else {
		$admin = false;
			
	};
} else if ($_SESSION['admin'] == true){
	
	if ($page == 'logout'){
		session_destroy();
		$page = 'index';
		//header("Location: ".$siteRoot."");
		header('Location: ' . $_SERVER['HTTP_REFERER']);
	} else{
		$admin = true;
		$noPageError = $editPageMessage;
	};
};

// Contact Page
if($page == 'contact' && $_REQUEST['contact'] == $contactID){
	$contactName = $_REQUEST['name'];
	$contactEmail = $_REQUEST['email'];
	$contactBot = $_REQUEST['phone'];
	$contactMessage = $_REQUEST['message'];
	$contactMessage = strip_tags($contactMessage);
	
	if($contactBot != ''){
		$contactError .=  '<p>You are a spambot. Go away!</p>';
	} else {	
		if(preg_match("/^[A-Z][a-zA-Z\s(\')\. -]+$/", $contactName) === 0){
			$contactError .=  '<p>Please provide your full name. (Only letters and spaces)</p>';
		} else {
			if(filter_var($contactEmail, FILTER_VALIDATE_EMAIL)){
				$to = $adminEmail;
				$subject = "Message from ". $contactName ." on the Family Climate for Road Safety Website";
				$body = "The following message is from ". $contactName ." on the Family Climate for Road Safety Website:\n\n". $contactMessage ."\n\n". $contactName ."\n". $contactEmail;
				if (mail($to, $subject, $body)) {
					$contactSuccess .=  ("<p><strong>The following message was sent successfully. We will try to get back to you soon. Thanks!</strong><br /><br />". $contactMessage ."</p>");
				} else {
					$contactError .= 'We were unable to send your message via this website. Please try contacting the Family Climate for Road Safety personnel directly via the email below. Sorry for any inconvenience.';	
				}
			} else {
				$contactError .= '<p>Please provide a valid email address</p>';
			}		
		}
	}
}


// Set index as default page
if(!$page || $page === false || $page == ''){
	$page = 'index';	
}

function getContent($elementID, $pageID){
	$filename = $siteRoot .'pages/'. urlencode($pageID) .'.json';
	if (file_exists($filename)) {
		$result = json_decode(file_get_contents($filename));
		$mainContent = $result->$elementID;	
		return $mainContent;
	} else {
		return;	
	};
};

function setContent($elementID, $elementValue, $pageID){	
	$filename = $siteRoot .'pages/'. urlencode($pageID) .'.json';
	$content = json_decode(@file_get_contents($filename), true);
	$elementValue = str_replace('\"','"',$elementValue);
	$elementValue = str_replace("\'","'",$elementValue);
	
	if($elementID == 'nav_menu'){		
		$content[$elementID] = $elementValue; 
	}else{
		$elementValue = str_replace(array("\r", "\n", "  "), ' ', $elementValue);
		$content[$elementID] = trim($elementValue);
	}
		
	@file_put_contents($filename, json_encode($content));
	
	if($pageID != 'all_pics'){
		echo getContent($elementID, $pageID);	
	};	
}

function archiveContent($pageID){
	$filename = $siteRoot .'pages/'. urlencode($pageID) .'.json';
	$archived = $siteRoot .'archive/'. urlencode($pageID) .'.json';
	
	$content = json_decode(@file_get_contents($filename), true);
	@file_put_contents($archived, json_encode($content));
	@unlink($filename);	
}

function exit_status($str){
	echo json_encode(array('status'=>$str));
	exit;
}
	
function get_extension($file_name){
	$ext = explode('.', $file_name);
	$ext = array_pop($ext);
	return strtolower($ext);
}

function get_random_string($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}
	
function uploadContent(){	
	$upload_dir = $siteRoot .'uploads/';
	$allowed_ext = array('jpg','jpeg','JPG','JPEG','png','PNG','gif','GIF');
	$all_thumbs = json_decode(@file_get_contents($siteRoot .'pages/all_pics.json'), true);
	
	if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
		exit_status('Error! Wrong HTTP method!');
	}
	
	if(array_key_exists('pic',$_FILES) && $_FILES['pic']['error'] == 0 ){
	
		$pic = $_FILES['pic'];
		$picNameFix = array("+", "(", ")", "|", "'", "?", " ");
		$picName = str_replace($picNameFix, '',$pic['name']);
		
		if(!in_array(get_extension($picName),$allowed_ext)){
			exit_status('Only '.implode(',',$allowed_ext).' files are allowed!');
		}
		// Ensure that file name is unique
		if($all_thumbs[$picName]){
			for ($i = 1; $i <= 20; $i++){
				if ($all_thumbs[$i .'_'. $picName]){
				} else {
					$picName = $i .'_'. $picName;
					break;
				}
			}
		}
		// Move the uploaded file from the temporary directory to the uploads folder, 
		// create a thumbnail, and log all pics in json file:
		if(move_uploaded_file($pic['tmp_name'], $upload_dir.$picName)){
			setContent($picName, $upload_dir.$picName, 'all_pics');
			
			$type=false;
			function open_image ($file) {
				//detect type and process accordinally
				global $type;
				$size=getimagesize($file);
				switch($size["mime"]){
					case "image/jpeg":
						$im = imagecreatefromjpeg($file); //jpeg file
					break;
					case "image/gif":
						$im = imagecreatefromgif($file); //gif file
				  break;
				  case "image/png":
					  $im = imagecreatefrompng($file); //png file
				  break;
				default: 
					$im=false;
				break;
				}
				return $im;
			}
			$thumbnailImage = open_image($upload_dir.$picName);
			
			$w = imagesx($thumbnailImage);
			$h = imagesy($thumbnailImage);
			
			//calculate new image dimensions (preserve aspect)
			if(isset($_GET['w']) && !isset($_GET['h'])){
				$new_w=$_GET['w'];
				$new_h=$new_w * ($h/$w);
			} elseif (isset($_GET['h']) && !isset($_GET['w'])) {
				$new_h=$_GET['h'];
				$new_w=$new_h * ($w/$h);
			} else {
				$new_w=isset($_GET['w'])?$_GET['w']:60;
				$new_h=isset($_GET['h'])?$_GET['h']:60;
				if(($w/$h) > ($new_w/$new_h)){
					$new_h=$new_w*($h/$w);
				} else {
					$new_w=$new_h*($w/$h);    
				}
			} 
			
			$im2 = ImageCreateTrueColor($new_w, $new_h);
			
			$imageFormat = strtolower(substr(strrchr($picName,"."),1));
			if($imageFormat == "gif" || $imageFormat == "png"){
				imagecolortransparent($im2, imagecolorallocatealpha($im2, 0, 0, 0, 127));
				imagealphablending($im2, false);
				imagesavealpha($im2, true);
			}
			
			imagecopyResampled ($im2, $thumbnailImage, 0, 0, 0, 0, $new_w, $new_h, $w, $h);
			//effects
			if(isset($_GET['blur'])){
				$lv=$_GET['blur'];
				for($i=0; $i<$lv;$i++){
					$matrix=array(array(1,1,1),array(1,1,1),array(1,1,1));
					$divisor = 9;
					$offset = 0;
					imageconvolution($im2, $matrix, $divisor, $offset); 
				} 
			}
			if(isset($_GET['sharpen'])){
				$lv=$_GET['sharpen'];
				for($i=0; $i<$lv;$i++){
					$matrix = array(array(-1,-1,-1),array(-1,16,-1),array(-1,-1,-1));
					$divisor = 8;
					$offset = 0;
					imageconvolution($im2, $matrix, $divisor, $offset);
				} 
			}
			imagejpeg($im2, $upload_dir.'thumbs/'.$picName);
			imagegif($im2, $upload_dir.'thumbs/'.$picName);
			imagepng($im2, $upload_dir.'thumbs/'.$picName);
			//move_uploaded_file($thumbnailImage, $upload_dir.'thumbs/'.$picName);
			
			//copy($upload_dir.$picName, $upload_dir.'thumbs/'.$picName);
			exit_status('File was uploaded successfuly!');
		}	
	}	
	exit_status('Something went wrong with your upload!');	
}

function getThumbnails(){
	$dirpath = $siteRoot ."uploads/thumbs/"; 
	$dh = opendir($dirpath); 
	echo '<div id="all_pics_holder">';
	while (false !== ($file = readdir($dh))) { 
		if (!is_dir("$dirpath/$file")) { 
	
		   echo '<div class="all_pics"><a class="insertPic" rel="'. $file .'" title="Insert image into page"><img src="'. $dirpath . $file .'" /></a>'. $file .'<br /><a class="insertPicBtn insertPic" rel="'. $file .'" title="Insert image into page">Insert</a></div>'; 
		}
	} 
	echo '</div>';
	closedir($dh);
}


if($deletePage == 'yes' && $page != 'index'){
	if($admin == true){	
		archiveContent($page);
	};	
}

if($editID){
	if($admin == true && $page != "all_pics"){	
		setContent($editID, $editValue, $page);
	};
} elseif ($page == "upload"){
	if($admin == true){
		uploadContent();
	};
} elseif ($page == "thumbnails"){
	if($admin == true){
		getThumbnails();
	};
} else {
?>
<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<title><?php
	$pageTitle =  getContent('page_title', $page, $noPageError);
	if($pageTitle != ""){
		echo $pageTitle .' - '; 
	}
 	echo getContent('site_title', 'index');
?></title>
<meta name="description" content="<?php echo getContent('site_title', 'index'); ?>" />
<meta name="viewport" content="width=device-width" />
<link rel="icon" href="/favicon.ico?<?php echo get_random_string(); ?>" />
<link rel="shortcut icon" href="/favicon.ico?5" />
<link href="<?php echo $siteRoot ?>css/global.css?<?php echo get_random_string()?>" rel="stylesheet" type="text/css" />
<script src="<?php echo $siteRoot ?>js/libs/modernizr-2.5.3.min.js"></script>
</head>
<body id="<?php echo urlencode($page); ?>" rel="<?php echo $contactID; ?>">

    <div id="skipnav">
        <a href="#skip">Skip to main content</a>
        <hr />
    </div>
    
    <?php 
	if($admin == true){
		// Admin bar at top
		echo '<div id="adminBar"><p><a href="#editTitle" id="editTitleBtn">Edit Page Title</a> ';
		if($page != 'index') {
			echo '<a href="#deleter" id="deleterBtn">Delete Page</a> '; 
		}
		echo '<a href="#editMenu" id="editMenuBtn">Edit Menu</a> <a href="http://nm.bob.wadholm.com/help" class="menuItem">Help</a> <a style="float: right;" href="'. $siteRoot .'logout">Logout</a></p></div>';
		// Edit Page Title
		echo '<div id="title" class="menuItem"><h2>Page Title: (shows in browser tab)</h2><div class="edit_title" id="page_title">'. getContent('page_title', $page) .'</div></div>';
		// Delete Page
		echo '<div id="deleter" class="menuItem"><h2>Are you sure you want to delete this page?</h2><form method="POST"><p><input type="checkbox" value="yes" name="deletePage" id="deletePage" /> <label for="deletePage"><strong>Yes, delete it!</strong></label><br /><button type="submit">Delete</button><button type="reset" id="cancelDelete">Cancel</button></p></form></div>';
		// Edit Nav Menu
		echo '<div id="editMenu" class="menuItem"><h2>Top Navigation Menu:</h2><div class="edit_menu" id="nav_menu">'. getContent('nav_menu', 'nav_menu') .'</div></div>';
		// Upload image or file	
?>
    <div class="menuItem">
        <div id="upload">
            <h2>Upload Image or File</h2>
            <div id="dropbox">
                <span class="message">Drop images here to upload. <br /><i>(Use Chrome or Firefox Browser)</i></span>	
            </div>
            <h2>All uploaded files</h2>
            <p><input type="text" id="searcher" placeholder="Search" /></p>
            
            <div id="all_pics">
            </div><!-- /all_pics -->            
        </div><!-- /upload -->
    </div><!-- /menuitem -->
<?php } 
// End of Admin bar
?> 
	<div id="outsideWrapper">
        <header>  
            <div id="logo">
                <a href="<?php echo $siteRoot ?>"><img src="<?php echo $siteRoot ?>img/logo.png" style="margin-right: 12px; display: inline-block; position: relative; top: -2px;" alt="NM CMS" /><?php echo getContent('site_title', 'index'); ?></a>
            </div>
            <nav id="topNav">
                <?php
				
				$navValue = getContent('nav_menu', 'nav_menu');
				$navValue = preg_replace('/(href=\")(.*\")/i', '$1'. $siteRoot .'$2 rel="$2', $navValue);
				$navValue = preg_replace('/(href=\")(.*http:)(.*\")/i', '$1http:$3', $navValue);  
				echo $navValue;
				?>  
            </nav>
        </header>
        
        <div id="wrapper">          
          <div id="insideWrapper">
                    
             <?php if ($page == 'index' || $page == '' || $page == 'index.php'){	?>			
                
                 <div id="featureWrapper">
                     <div role="featureImg" class="edit_area" id="featureImg">
                     
                        <?php echo getContent('featureImg', 'index'); ?>
                        
                     </div><!-- /featureImg -->
                 </div><!-- /featureWrapper --> 
                 
                 
                 <div role="homePage" id="home_page_wrapper">
                 	<div role="home_page" class="edit_area" id="home_page">
                 
                 	 <?php echo getContent('home_page', 'index'); ?>
                    
                    </div>
                 </div><!-- /home_page_wrapper -->
                 
                
                
				<?php }else if($page == 'contact'){ ?>
                <div role="main" id="main_content">
                	<form method="POST" action="contact">
                    	<div id="contactErrors">
                        	<?php echo $contactError; ?>
                        </div>
                        <?php
						if ($contactSuccess != ''){
							echo '<div id="contactSuccess">'. $contactSuccess .'</div>';
						} else { 
							?>
							<div id="contact_content" class="edit_area">
						
							<?php echo getContent('contact_content', $page); ?>
							
							</div>
											  
							<div id="phoneContact">
								<p><label for="phone">Please leave this field blank.</label><br />		
								<input type="phone" value="" name="phone" />
								<input type="hidden" value="<?php echo $contactID; ?>" name="contact" /></p></div>
							<?php if($admin == false){ 
								echo '<p><button type="submit" value="Submit">Submit</button></p>';
							}
						}?>
                    </form>
                </div>
                		
					
				<?php }else { ?>
                 <div role="main" class="edit_area" id="main_content">
                <?php        
                        $main_content = getContent('main_content', $page);
                        if ($main_content != ''){
                            echo $main_content;
                        } else {
                            echo $noPageError;	
                        } 
                ?>
                </div>
                <?php }	?>
             	<br class="clear" />
         	</div><!-- /insideWrapper -->        
  		</div><!-- /wrapper --> 
    </div><!-- /outsideWrapper --> 
          
          
          
    <footer>
        <div id="copyright">
        
            <div id="copyrightContainer">
                <div role="footerContent" class="edit_footer" id="footer_content">
                <?php        
                       echo getContent('footer_content', 'footer');
                ?>
                </div>
                                
                <p>Copyright &copy; <?php echo date("Y"); ?><br />
                <?php 
                if ($admin == true){
                    echo '<a href="'. $siteRoot .'logout">Logout</a>';
                } else {
                    echo '<a href="#loginForm" class="inline cboxElement" id="login">Login</a>';
                }
                ?> 
                </p>
            </div><!-- /copyrightContainer -->
         </div><!-- /copyright -->
         <div id="loginFormWrapper">
             <div id="loginForm">
                <h2>Login</h2>
                <form action="" method="post" name="login_form" id="login_form">
                    <?php if ($username && $username != $adminUsername || $password && $password != $adminPassword){ echo $loginError; }; ?>
                    <p><label>Username: </label><input type="text" name="vip" id="vip" /></p>
                    <p><label>Password: </label><input type="password" name="vipp"id="vipp" /></p>
                    <p><input type="submit" value="Submit"/></p>
                </form>
             </div>
         </div>
         <br class="clear" />
         <br />
    </footer>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
<script>window.jQuery || document.write('<script src="<?php echo siteRoot ?>js/libs/jquery-1.7.1.min.js" type="text/javascript"><\/script>')</script>
<script src="<?php echo $siteRoot ?>js/plugins.js"></script>
<script src="<?php echo $siteRoot ?>js/script.js"></script>
<?php if($admin == true && $page != "all_pics"){ echo '<script src="'. $siteRoot .'js/editable.js?'. get_random_string() .'" type="text/javascript"></script>';}; ?>
<script type="text/javascript">
/* Update _setAccount value to user's Google Analytic account and uncomment this script 
 var _gaq = _gaq || [];
  _gaq.push(['_setAccount', '//////']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();*/
</script>
</body>
</html>
<?php } ?>