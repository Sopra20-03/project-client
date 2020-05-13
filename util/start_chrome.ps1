$num_instances = 2

For ($i = 1; $i -lt $num_instances+1; $i++) {
    $location = "C:/Chrome_dev" + $i + "_session"
    Remove-Item -LiteralPath $location -Force -Recurse
    start chrome --user-data-dir=$location
}

