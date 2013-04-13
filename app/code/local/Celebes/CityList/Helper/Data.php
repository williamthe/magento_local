<?php

	class Celebes_CityList_Helper_Data extends Mage_Directory_Helper_Data
	{
		protected $_regionJson;
		protected $_cityJson;
		public function getCityJson()
		{

			//Varien_Profiler::start('TEST: '.__METHOD__);
			if (!$this->_regionJson) {
				/*$cacheKey = 'DIRECTORY_CITY_JSON_STORE'.Mage::app()->getStore()->getId();
				if (Mage::app()->useCache('config')) {
					$json = Mage::app()->loadCache($cacheKey);
				}*/
				if (empty($json)) {
					$countryIds = array();
					foreach ($this->getCountryCollection() as $country) {
						$countryIds[] = $country->getCountryId();
					}
					$collection = Mage::getModel('directory/region')->getResourceCollection()
						->addCountryFilter($countryIds)
						->load();
					
					$regionCodes = array();
					$regionCollectionId = array();

					foreach ($collection as $region) {
						if (!$region->getRegionId()) {
							continue;
						}
						if(strlen($region->getCode())<=4 && $region->getCountryId() == 'ID')
						{
							$regionCodes[] = $region->getCode();
							$regionCollectionId[$region->getCode()] = $region->getRegionId();
						}
					}

					$collection = Mage::getModel('CityList/City')->getCollection()
									->addCountryFilter($countryIds)
									->addRegionFilter($regionCodes)->load();

					
					$cities = array();
					
					foreach ($collection as $city) {
						$cities[$city->getCountryId()][$regionCollectionId[$city->getRegionCode()]][$city->getCityId()] = array(
						'code' => $city->getCode(),
						'name' => $city->getDefaultName());
					}
					
					$json = Mage::helper('core')->jsonEncode($cities);
			
				}
				$this->_regionJson = $json;
			}
			//Varien_Profiler::stop('TEST: '.__METHOD__);
			return $this->_regionJson;
		}
	}
	
?>