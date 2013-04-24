<?php
class Celebes_CityList_Block_Overwrite_UploaderOverwrite extends Mage_Adminhtml_Block_Media_Uploader
{
	public function getUploaderUrl($url)
    {
        if (!is_string($url)) {
            $url = '';
        }
        $design = Mage::getDesign();
        $theme = $design->getTheme('skin');
        if (empty($url) || !$design->validateFile($url, array('_type' => 'skin', '_theme' => $theme))) {
            $theme = $design->getDefaultTheme();
        }
		//Mage::helper('core/url')->getHomeUrl();
		//Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB) . 'skin/'
		//Mage_Core_Model_Store::URL_TYPE_SKIN
        return  Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_SKIN) .
            $design->getArea() . '/' . $design->getPackageName() . '/' . $theme . '/' . $url;
    }
}