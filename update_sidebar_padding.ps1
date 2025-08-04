# PowerShell script to update sidebar button padding from py-3 to py-4
# This will make the buttons even bigger with more top and bottom padding

# Get all HTML files in the project
$htmlFiles = Get-ChildItem -Path "c:\Users\User\OneDrive\Desktop\Health\VIEW" -Recurse -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace sidebar-link patterns with py-3 to py-4
    $content = $content -replace 'sidebar-link([^"]*?)px-2 py-3([^"]*?)', 'sidebar-link$1px-2 py-4$2'
    
    # Replace dropdown-link patterns with py-3 to py-4
    $content = $content -replace 'dropdown-link([^"]*?)px-4 py-3([^"]*?)', 'dropdown-link$1px-4 py-4$2'
    
    # Write the updated content back to the file
    $content | Set-Content -Path $file.FullName -NoNewline
}

Write-Host "Update completed for all HTML files!"
