/**
 * AI 响应逻辑
 * 根据用户消息返回相应的 AI 回复
 */
export function getAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('crypto') || lowerMessage.includes('bitcoin')) {
    return 'Based on current trends, crypto markets are showing strong momentum. Bitcoin narratives have a 72% bullish sentiment with increased trading volume.';
  } else if (lowerMessage.includes('politic')) {
    return 'Political markets remain relatively stable. The 2024 election narratives are experiencing moderate engagement with balanced Long/Short positions.';
  } else if (lowerMessage.includes('trend') || lowerMessage.includes('market')) {
    return 'Current market analysis shows: Crypto (+72%), AI & Tech (+45%), Sports (+15%). Political markets are steady with moderate volatility.';
  } else if (lowerMessage.includes('hot') || lowerMessage.includes('popular')) {
    return 'The hottest narratives right now are: Bitcoin Halving Effect, AI Market Prediction Bundle, and Paris Olympics 2024. These are seeing the highest trading volumes.';
  } else {
    return 'I can help you analyze market trends, predict outcomes, and understand narrative performance. What would you like to know?';
  }
}
