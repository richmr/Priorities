<?php
  /******************
    This is used to clone blogdown into your target site
    Set the $target_directory relative to the location where you put this
    file.  Note, you can't have it IN the target directory
  *******************/

  $target_directory = "./Priorities";
  $repo = "https://github.com/richmr/Priorities.git";
  $cmd = "git clone $repo $target_directory 2>&1";

  echo '<pre>';
  passthru($cmd);
  echo '</pre>';
 ?>
