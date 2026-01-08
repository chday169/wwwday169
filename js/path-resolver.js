// js/path-resolver.js
/**
 * 根據當前頁面自動解析正確的數據路徑
 */
class PathResolver {
  static getBasePath() {
    // 根據當前頁面判斷是哪個閱讀器
    const currentPage = window.location.pathname.split('/').pop();
    const baseURL = window.location.origin;
    
    if (currentPage === 'viewer_geo.html') {
      return {
        type: 'geo',
        manifest: './data_geo/manifest.json',
        pdfBase: './data_geo/',
        statsKey: 'geo_stats'
      };
    } else if (currentPage === 'viewer_scr.html') {
      return {
        type: 'scr',
        manifest: './data_scr/manifest.json',
        pdfBase: './data_scr/',
        statsKey: 'scr_stats'
      };
    } else if (currentPage === 'viewer_foc.html') {
      return {
        type: 'foc',
        manifest: './data_foc/manifest.json',
        pdfBase: './data_foc/',
        statsKey: 'foc_stats'
      };
    } else {
      return {
        type: 'geo',
        manifest: './data_geo/manifest.json',
        pdfBase: './data_geo/',
        statsKey: 'geo_stats'
      };
    }
  }

  static fixPDFPath(pdfUrl, basePath) {
    // 如果已經是完整URL，直接返回
    if (pdfUrl.startsWith('http') || pdfUrl.startsWith('//')) {
      return pdfUrl;
    }
    
    // 移除可能的多餘前綴
    let cleanUrl = pdfUrl;
    if (cleanUrl.startsWith('./')) cleanUrl = cleanUrl.substring(2);
    if (cleanUrl.startsWith('data_geo/')) cleanUrl = cleanUrl.substring(9);
    if (cleanUrl.startsWith('data_scr/')) cleanUrl = cleanUrl.substring(9);
    if (cleanUrl.startsWith('data_foc/')) cleanUrl = cleanUrl.substring(9);
    
    // 添加基礎路徑
    return basePath + cleanUrl;
  }

  static async testConnection(url, name) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      return {
        name: name,
        url: url,
        status: res.status,
        ok: res.ok,
        message: res.ok ? '✅ 連接成功' : `❌ 錯誤: ${res.status}`
      };
    } catch (error) {
      return {
        name: name,
        url: url,
        status: 0,
        ok: false,
        message: `❌ 連接失敗: ${error.message}`
      };
    }
  }
}