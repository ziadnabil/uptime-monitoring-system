const db = require('../../../models/index');
const utils = require('../../utils');
const { UnexpectedError, BadRequest } = require('../../../utils/Errors');
const standardResponse = require('../../../utils/standardResponse');
const reportService = require('../../../services/reprotService.service');

module.exports = {

    userDetailedUptimeReport: async (request, response, next) => {
    try{
        const userId = request.user.id
        where.userId = userId

        const reportResults = await reportService.getMonitoringResultsForDetailedUptimeReport(where);
    
        //generating excel data for users
        const data = reportService.mapUserDataToExcelFormatDetailedUptimeReport(reportResults);
        
        let workbook = new excelJS.Workbook();
        let worksheet = workbook.addWorksheet("user_uptime_monitoring_report");
        worksheet = reportService.generateExcelWorksheetDetailedUptimeReport(data, worksheet);
    
        // Write the Excelfile to the response
        const fileName = `user_uptime_monitoring_report${Date.now()}.xlsx`
        response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
    
        await reportService.writeExcelFileToResponse(workbook, response);
    
        response.end();
        } catch (error) {
        next(error)
        }
    }

};
