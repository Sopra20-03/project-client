$num_instances = 4

For ($i = 1; $i -lt $num_instances+1; $i++) {
    $location = "C:/Chrome_dev" + $i + "_session"
    rmdir /Q /S $location
    start chrome --user-data-dir=$location
}

