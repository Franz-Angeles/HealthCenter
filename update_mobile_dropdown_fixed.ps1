# PowerShell script to fix any remaining py-2 navigation items in mobile dropdown
# This script is more specific and handles different formatting patterns

# Get all HTML files in the project
$htmlFiles = Get-ChildItem -Path "c:\Users\User\OneDrive\Desktop\Health\VIEW" -Recurse -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace various patterns for Home, Services, Profile navigation items
    $content = $content -replace 'href="[^"]*LandingP\.html"[^>]*class="block px-4 py-2 text-gray-700 hover:bg-gray-100"', 'href="../../HTML/LandingP.html" class="block px-4 py-4 text-gray-700 hover:bg-gray-100"'
    $content = $content -replace 'href="#"[^>]*class="block px-4 py-2 text-gray-700 hover:bg-gray-100"', 'href="#" class="block px-4 py-4 text-gray-700 hover:bg-gray-100"'
    $content = $content -replace 'href="[^"]*ProfileSettings\.html"[^>]*class="block px-4 py-2 text-gray-700 hover:bg-gray-100"', 'href="../../HTML/ProfileSettings.html" class="block px-4 py-4 text-gray-700 hover:bg-gray-100"'
    
    # More direct pattern replacements
    $content = $content -replace 'class="block px-4 py-2 text-gray-700 hover:bg-gray-100"(?=\s*>Home<)', 'class="block px-4 py-4 text-gray-700 hover:bg-gray-100"'
    $content = $content -replace 'class="block px-4 py-2 text-gray-700 hover:bg-gray-100"(?=\s*>Services<)', 'class="block px-4 py-4 text-gray-700 hover:bg-gray-100"'
    $content = $content -replace 'class="block px-4 py-2 text-gray-700 hover:bg-gray-100"(?=\s*>Profile<)', 'class="block px-4 py-4 text-gray-700 hover:bg-gray-100"'
    
    # Write the updated content back to the file
    $content | Set-Content -Path $file.FullName -NoNewline
}

Write-Host "Comprehensive update completed for all HTML files!"
