import {fetchPricing} from '@/api/pricing/pricing';
import * as utils from '@/utils/utils';

describe('api/pricing/pricing', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  })

  it('should fetch all pricing from the API', async () => {
    // Arrange
    // Mock the sleep method
    vi.spyOn(utils, 'sleep').mockResolvedValue(undefined);

    // Act
    const pricingData = await fetchPricing();

    // Assert
    expect(pricingData.length).toBe(3);
  });

  it('should fetch no pricing when the id is invalid', async () => {
    // Arrange
    // Mock the sleep method
    vi.spyOn(utils, 'sleep').mockResolvedValue(undefined);

    // Act
    const pricingData = await fetchPricing('non-existent');

    // Assert
    expect(pricingData.length).toBe(0);
  });

  it('should fetch only the matched item', async () => {
    // Arrange
    // Mock the sleep method
    vi.spyOn(utils, 'sleep').mockResolvedValue(undefined);

    // Act
    const pricingData = await fetchPricing('hour');

    // Assert
    expect(pricingData[0].id).toBe('hour');
  });
});
