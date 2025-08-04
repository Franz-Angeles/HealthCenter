# PowerShell script to make all mobile dropdown buttons the same size
# Update Home, Services, and Profile links to have py-4 padding like the module links

# Get all HTML files in the project
$htmlFiles = Get-ChildItem -Path "c:\Users\User\OneDrive\Desktop\Health\VIEW" -Recurse -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace navigation items (Home, Services, Profile) to have py-4 instead of py-2
    # This makes them consistent with the module dropdown links
    $content = $content -replace 'class="block px-4 py-2 text-gray-700 hover:bg-gray-100"', 'class="block px-4 py-4 text-gray-700 hover:bg-gray-100"'
    
    # Write the updated content back to the file
    $content | Set-Content -Path $file.FullName -NoNewline
}

Write-Host "Update completed for all HTML files!"
