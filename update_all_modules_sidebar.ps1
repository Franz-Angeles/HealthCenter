# PowerShell script to remove Patient Flow Forecast and Service Usage Trends links from all modules

# Define the HTML files that need to be updated
$filesToUpdate = @(
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\HTML\BarangayMapView.html",
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\HTML\ProfileSettings.html",
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\SERVICES\serviceshtml\ChatModule.html",
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\SERVICES\serviceshtml\ContentManagement.html",
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\SERVICES\serviceshtml\Events&Seminar.html",
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\SERVICES\serviceshtml\HealthProgram.html",
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\SERVICES\serviceshtml\QRCode.html",
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\SERVICES\serviceshtml\Spotmap.html",
    "c:\Users\User\OneDrive\Desktop\Health\VIEW\SERVICES\serviceshtml\VirtualConsultation.html"
)

# Pattern to remove Patient Flow Forecast links from sidebar
$patientFlowForecastPattern = @'
        <a\s+href="[^"]*PatientFlowFcst\.html"[^>]*>[^<]*</a>
'@

# Pattern to remove Service Usage Trends links from sidebar  
$serviceUsageTrendsPattern = @'
        <a\s+href="[^"]*ServiceUsageTrends\.html"[^>]*>[^<]*</a>
'@

# Pattern for mobile dropdown Patient Flow Forecast links
$mobilePatientFlowPattern = @'
            <a\s+href="[^"]*PatientFlowFcst\.html"[^>]*>[^<]*</a>
'@

# Pattern for mobile dropdown Service Usage Trends links
$mobileServiceUsagePattern = @'
            <a\s+href="[^"]*ServiceUsageTrends\.html"[^>]*>[^<]*</a>
'@

$filesUpdated = 0
$filesNotFound = 0

foreach ($file in $filesToUpdate) {
    if (Test-Path $file) {
        Write-Host "Processing: $file" -ForegroundColor Yellow
        
        try {
            # Read the file content
            $content = Get-Content $file -Raw -Encoding UTF8
            $originalContent = $content
            
            # Remove Patient Flow Forecast links from sidebar
            $content = $content -replace $patientFlowForecastPattern, ""
            
            # Remove Service Usage Trends links from sidebar
            $content = $content -replace $serviceUsageTrendsPattern, ""
            
            # Remove mobile dropdown Patient Flow Forecast links
            $content = $content -replace $mobilePatientFlowPattern, ""
            
            # Remove mobile dropdown Service Usage Trends links
            $content = $content -replace $mobileServiceUsagePattern, ""
            
            # Also remove any remaining references with different patterns
            $content = $content -replace '(?s)\s*<a[^>]*href="[^"]*PatientFlowFcst\.html"[^>]*>.*?</a>', ""
            $content = $content -replace '(?s)\s*<a[^>]*href="[^"]*ServiceUsageTrends\.html"[^>]*>.*?</a>', ""
            
            # Clean up any double line breaks left behind
            $content = $content -replace '\r?\n\s*\r?\n\s*\r?\n', "`r`n`r`n"
            
            if ($content -ne $originalContent) {
                # Write the updated content back to file
                Set-Content $file -Value $content -Encoding UTF8 -NoNewline
                Write-Host "Updated $file successfully" -ForegroundColor Green
                $filesUpdated++
            } else {
                Write-Host "No changes needed for $file" -ForegroundColor Cyan
            }
        }
        catch {
            Write-Host "Error processing $file`: $_" -ForegroundColor Red
        }
    } else {
        Write-Host "File not found: $file" -ForegroundColor Red
        $filesNotFound++
    }
}

Write-Host "`nSummary:" -ForegroundColor White
Write-Host "Files updated: $filesUpdated" -ForegroundColor Green
Write-Host "Files not found: $filesNotFound" -ForegroundColor Red
Write-Host "All modules updated successfully!" -ForegroundColor Green
