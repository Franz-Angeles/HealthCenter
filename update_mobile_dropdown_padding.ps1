# PowerShell script to update mobile dropdown button padding from py-4 to py-2
# This will make the mobile dropdown buttons smaller

# Get all HTML files in the project
$htmlFiles = Get-ChildItem -Path "c:\Users\User\OneDrive\Desktop\Health\VIEW" -Recurse -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace dropdown-link patterns with py-4 to py-2 (for mobile dropdown)
    $content = $content -replace 'dropdown-link([^"]*?)px-4 py-4([^"]*?)', 'dropdown-link$1px-4 py-2$2'
    
    # Write the updated content back to the file
    $content | Set-Content -Path $file.FullName -NoNewline
}

Write-Host "Mobile dropdown update completed for all HTML files!"
