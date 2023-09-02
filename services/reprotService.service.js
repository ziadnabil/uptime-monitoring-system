const db = require('../models/index')

module.exports = {
  
  getMonitoringResultsForDetailedUptimeReport: async function(where) {
    return await db.MonitoringResults.findAll({
      attributes: ['id', 'availability', 'outages', 'downtime', 'uptime', 'responseTime', 'status', 'createdAt'],
      include: [
        {
          model: db.Check,
          attributes: ['name', 'url'],
          where,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  },

  mapUserDataToExcelFormatDetailedUptimeReport: function(results) {
    return results.map(result => {
      return {
      [`Check_Name`]: result.Check.name ? result.Check.name : "not found",
      [`Check_Url`]: result.Check.url ? result.Check.url : "not found",
      [`Availability`]: result.availability ? result.availability : "not found",
      [`Outages`]: result.outages ? result.outages : "not found",
      [`Down_Time`]: result.downtime ? result.downtime : "not found",
      [`Up_Time`]: result.uptime ? result.uptime : "not found",
      [`Response_Time`]: result.responseTime ? result.responseTime : "not found",
      [`status`]: result.status ? result.status : "not found",
      [`createdAt`]: result.createdAt ? result.createdAt : "not found",
      }
    })
  },
  
  generateExcelWorksheetDetailedUptimeReport: async function(data, worksheet) {
    worksheet.columns = [
      { header: `Check Name`, key: `Check_Name`, width: 10 },
      { header: `Check Url`, key: `Check_Url`, width: 20 },
      { header: `Availability`, key: `Availability`, width: 20 },
      { header: `Outages`, key: `Outages`, width: 10 },
      { header: `Down Time`, key: `Down_Time`, width: 20 },
      { header: `Up Time`, key: `Up Time`, width: 20 },
      { header: `Response Time`, key: `Response_Time`, width: 10 },
      { header: `status`, key: `status`, width: 20 },
      { header: `Happening Time`, key: `createdAt`, width: 20 },
    ];
  
    data.map(async one => { await worksheet.addRow(one) })
    return worksheet;
  },
  
  writeExcelFileToResponse: async function(workbook, response) {
    await workbook.xlsx.write(response);  
    response.end();
  }

}