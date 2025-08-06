# PowerShell script to update sidebar links in all HTML files
# Remove Patient Flow Forecast and Service Usage Trends links

$files = @(
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\HTML\InventoryAlertSystem.html",
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\HTML\SeasonalityExplorer.html", 
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\HTML\StaffingPlanner.html",
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\SERVICES\serviceshtml\UserManagement.html",
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\SERVICES\serviceshtml\Logs.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Updating $file"
        
        # Read file content
        $content = Get-Content $file -Raw
        
        # Remove Patient Flow Forecast and Service Usage Trends from mobile dropdown
        $content = $content -replace '(?s)<a\s+href="[^"]*PatientFlowFcst\.html"[^>]*>.*?</a>\s*<hr\s*/?>?\s*', ''
        $content = $content -replace '(?s)<a\s+href="[^"]*ServiceUsageTrends\.html"[^>]*>.*?</a>\s*<hr\s*/?>?\s*', ''
        
        # Remove from sidebar
        $content = $content -replace '(?s)<a\s+href="[^"]*PatientFlowFcst\.html"[^>]*>.*?</a>\s*', ''
        $content = $content -replace '(?s)<a\s+href="[^"]*ServiceUsageTrends\.html"[^>]*>.*?</a>\s*', ''
        
        # Write back to file
        Set-Content $file -Value $content -NoNewline
        
        Write-Host "Updated $file successfully"
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "All files updated successfully!"
