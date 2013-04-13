<?php
class Celebes_CityList_Model_City extends Mage_Core_Model_Abstract
{
     public function _construct()
     {
         parent::_construct();
         $this->_init('CityList/City');
     }
}