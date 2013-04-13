<?php
class Celebes_CityList_Model_Mysql4_City extends Mage_Core_Model_Mysql4_Abstract
{
     public function _construct()
     {
         $this->_init('CityList/City', 'city_id');
     }
}