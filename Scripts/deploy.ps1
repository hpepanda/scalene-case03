Set-Executionpolicy -Scope CurrentUser -ExecutionPolicy UnRestricted

If (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator"))

{   
$arguments = "& '" + $myinvocation.mycommand.definition + "'"
Start-Process powershell -Verb runAs -ArgumentList $arguments
Break
}

Import-Module WebAdministration
$iisAppPoolName = "ScaleneExpenses"
$iisAppPoolDotNetVersion = "v4.0"
$iisAppName = "ScaleneExpenses"
$gitBinariesPath = "https://bitbucket.org/yoctopeople/case-3-net/get/master.zip"

#$rootDirectory = (Get-Item -Path ".\" -Verbose).FullName;
$webDirectory = "C:\scalene-net";
if(Test-Path $webDirectory)
{
    Remove-Item $webDirectory  -Force -Recurse
}
git clone "https://yocto_guest:yoctopass1@bitbucket.org/yoctopeople/case-3-net.git" $webDirectory


#navigate to the app pools root
cd IIS:\AppPools\

if ((Test-Path $iisAppPoolName -pathType container))
{
    Remove-WebAppPool -Name $iisAppPoolName
}


#create the app pool
$appPool = New-Item $iisAppPoolName
$appPool | Set-ItemProperty -Name "managedRuntimeVersion" -Value $iisAppPoolDotNetVersion


#navigate to the sites root
cd IIS:\Sites\


#check if the site exists
if (Test-Path $iisAppName -pathType container)
{
    return;
} 

#create the site
$iisApp = New-Item $iisAppName -bindings @{protocol="http";bindingInformation=":8080:"} -physicalPath ($webDirectory + "\PublicBinaries")
$iisApp | Set-ItemProperty -Name "applicationPool" -Value $iisAppPoolName