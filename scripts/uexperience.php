<?php
$data = json_decode(file_get_contents("php://input"));
$file_path = "./research_plans/" . strval(time()) . ".json";
$file_handle = fopen($file_path, 'w');
fwrite($file_handle, json_encode($data));
fclose($file_handle);

$all_research_plans = [];
$all_plans = array_diff(scandir("./research_plans/"), array('.', '..'));
foreach ($all_plans as $current_file) {
    $current_file_handle = fopen("./research_plans/" . $current_file, "r");
    $current_data = fread($current_file_handle, filesize("./research_plans/" . $current_file));
    $current_data = json_decode($current_data);
    $all_research_plans[] = $current_data;
    fclose($current_file_handle);
} 
$final_file_handle = fopen("all_research_projects.json", "w");
$final_data = json_encode($all_research_plans);
fwrite($final_file_handle, $final_data);
fclose($final_file_handle);
?>
