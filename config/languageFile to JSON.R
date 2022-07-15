# sets the directory of location of this script as the current directory
setwd(dirname(rstudioapi::getSourceEditorContext()$path))

rm(list=ls(all=TRUE))
graphics.off()

############################################################################
# load packages, functions, data
############################################################################

################
# packages
################
library(jsonlite)
library(xlsx)

################
# data
################
dir()
dat <- xlsx::read.xlsx2(file = "languageFile.xlsx", sheetIndex = 1)
write(toJSON(dat), "languageFile.json")