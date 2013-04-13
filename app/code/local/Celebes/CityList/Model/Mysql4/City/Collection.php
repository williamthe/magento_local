<?php
class Celebes_CityList_Model_Mysql4_City_Collection extends Mage_Core_Model_Mysql4_Collection_Abstract
 {
     public function _construct()
     {
         parent::_construct();
         $this->_init('CityList/City');
     }
	 
	public function addCountryFilter($countryId)
    {
        if (!empty($countryId)) {
            if (is_array($countryId)) {
                $this->addFieldToFilter('main_table.country_id', array('in' => $countryId));
            } else {
                $this->addFieldToFilter('main_table.country_id', $countryId);
            }
        }
        return $this;
    }
	
	public function addRegionFilter($regionCode)
    {
        if (!empty($regionCode)) {
            if (is_array($regionCode)) {
                $this->addFieldToFilter('main_table.region_code', array('in' => $regionCode));
            } else {
                $this->addFieldToFilter('main_table.region_code', $regionCode);
            }
        }
        return $this;
    }
}